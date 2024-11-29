import { flatten } from 'lodash-es';
import type { Advert } from '../../../define/Advert';
import type { A9AdUnitInterface } from '../../../types/global';
import { noop } from '../../../utils/noop';
import type { HeaderBiddingSlot, SlotFlatMap } from '../prebid-types';
import { getHeaderBiddingAdSlots } from '../slot-config';

/*
 * Amazon's header bidding javascript library
 * https://ams.amazon.com/webpublisher/uam/docs/web-integration-documentation/integration-guide/javascript-guide/display.html
 */

class A9AdUnit implements A9AdUnitInterface {
	slotID: string;
	slotName?: string;
	sizes: number[][];

	constructor(advert: Advert, slot: HeaderBiddingSlot) {
		this.slotID = advert.id;
		this.slotName = window.guardian.config.page.adUnit;
		this.sizes = slot.sizes.map((size) => Array.from(size));
	}
}

let initialised = false;
let requestQueue = Promise.resolve();

const bidderTimeout = 1500;

const displayAd = (adPosition: string): void => {
	const adSlot = document.getElementById(`dfp-ad--${adPosition}`);
	if (adSlot) {
		window.googletag.display(adSlot.id);
	}
};

const initialise = (): void => {
	if (!initialised && window.apstag) {
		initialised = true;
		const pageConfig = window.guardian.config.page;
		let adPosition = '';

		if (pageConfig.isFront) {
			if (pageConfig.section === 'network') {
				adPosition = 'inline1';
			} else {
				adPosition = 'top-above-nav';
			}
		}
		window.apstag.init({
			pubID: window.guardian.config.page.a9PublisherId,
			adServer: 'googletag',
			bidTimeout: bidderTimeout,
		});
		displayAd(adPosition);
	}
};

// slotFlatMap allows you to dynamically interfere with the PrebidSlot definition
// for this given request for bids.
const requestBids = async (
	adverts: Advert[],
	slotFlatMap?: SlotFlatMap,
): Promise<void> => {
	if (!initialised) {
		return requestQueue;
	}

	if (!window.guardian.config.switches.a9HeaderBidding) {
		return requestQueue;
	}

	const adUnits = flatten(
		adverts.map((advert) =>
			getHeaderBiddingAdSlots(advert, slotFlatMap).map(
				(slot) => new A9AdUnit(advert, slot),
			),
		),
	);

	if (adUnits.length === 0) {
		return requestQueue;
	}

	requestQueue = requestQueue
		.then(
			() =>
				new Promise<void>((resolve) => {
					window.apstag?.fetchBids({ slots: adUnits }, () => {
						window.googletag.cmd.push(() => {
							window.apstag?.setDisplayBids();
							resolve();
						});
					});
				}),
		)
		.catch(noop);

	return requestQueue;
};

export const a9 = {
	initialise,
	requestBids,
};

export const _ = {
	resetModule: (): void => {
		initialised = false;
		requestQueue = Promise.resolve();
	},
};
