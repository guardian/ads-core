import {
	getConsentFor,
	onConsentChange,
} from '@guardian/consent-management-platform';
import config from '@guardian/frontend/static/src/javascripts/lib/config';
import fastdom from '@guardian/frontend/static/src/javascripts/lib/fastdom-promise';
import raven from '@guardian/frontend/static/src/javascripts/lib/raven';
import sha1 from '@guardian/frontend/static/src/javascripts/lib/sha1';
import { getPageTargeting } from '@guardian/frontend/static/src/javascripts/projects/common/modules/commercial/build-page-targeting';
import { commercialFeatures } from '@guardian/frontend/static/src/javascripts/projects/common/modules/commercial/commercial-features';
import { getUserFromCookie } from '@guardian/frontend/static/src/javascripts/projects/common/modules/identity/api';
import { loadScript, storage } from '@guardian/libs';
import qwery from 'qwery';
import { adFreeSlotRemove } from '../ad-free-slot-remove';
import { init as initMessenger } from '../messenger';
import { init as background } from '../messenger/background';
import { init as sendClick } from '../messenger/click';
import { init as disableRefresh } from '../messenger/disable-refresh';
import { init as initGetPageTargeting } from '../messenger/get-page-targeting';
import { init as initGetPageUrl } from '../messenger/get-page-url';
import { init as getStyles } from '../messenger/get-stylesheet';
import { init as hide } from '../messenger/hide';
import { init as resize } from '../messenger/resize';
import { init as scroll } from '../messenger/scroll';
import { init as type } from '../messenger/type';
import { init as viewport } from '../messenger/viewport';
import { dfpEnv } from './dfp-env';
import { fillAdvertSlots } from './fill-advert-slots';
import { onSlotLoad } from './on-slot-load';
import { onSlotRender } from './on-slot-render';
import { onSlotViewableFunction } from './on-slot-viewable';
import { onSlotVisibilityChanged } from './on-slot-visibility-changed';
import { refreshOnResize } from './refresh-on-resize';

initMessenger(
	type,
	getStyles,
	initGetPageTargeting,
	initGetPageUrl,
	resize,
	hide,
	scroll,
	viewport,
	sendClick,
	background,
	disableRefresh,
);

const setDfpListeners = () => {
	const pubads = window.googletag.pubads();
	pubads.addEventListener('slotRenderEnded', raven.wrap(onSlotRender));
	pubads.addEventListener('slotOnload', raven.wrap(onSlotLoad));

	pubads.addEventListener('impressionViewable', onSlotViewableFunction());

	pubads.addEventListener('slotVisibilityChanged', onSlotVisibilityChanged);
	if (storage.session.isAvailable()) {
		const pageViews = storage.session.get('gu.commercial.pageViews') || 0;
		storage.session.set('gu.commercial.pageViews', pageViews + 1);
	}
};

const setPageTargeting = () => {
	const pubads = window.googletag.pubads();
	// because commercialFeatures may export itself as {} in the event of an exception during construction
	const targeting = getPageTargeting();
	Object.keys(targeting).forEach((key) => {
		pubads.setTargeting(key, targeting[key]);
	});
};

// This is specifically a separate function to close-disabled-slots. One is for
// closing hidden/disabled slots, the other is for graceful recovery when prepare-googletag
// encounters an error. Here, slots are closed unconditionally.
const removeAdSlots = () => {
	// Get all ad slots
	const adSlots = qwery(dfpEnv.adSlotSelector);

	return fastdom.mutate(() => adSlots.forEach((adSlot) => adSlot.remove()));
};

const setPublisherProvidedId = () => {
	const user = getUserFromCookie();
	if (user) {
		const hashedId = sha1.hash(user.id);
		window.googletag.pubads().setPublisherProvidedId(hashedId);
	}
};

export const init = () => {
	const setupAdvertising = () => {
		// note: fillAdvertSlots isn't synchronous like most buffered cmds, it's a promise. It's put in here to ensure
		// it strictly follows preceding prepare-googletag work (and the module itself ensures dependencies are
		// fulfilled), but don't assume fillAdvertSlots is complete when queueing subsequent work using cmd.push
		window.googletag.cmd.push(
			setDfpListeners,
			setPageTargeting,
			setPublisherProvidedId,
			refreshOnResize,
			() => {
				fillAdvertSlots();
			},
		);

		onConsentChange((state) => {
			let canRun = true;
			if (state.ccpa) {
				// CCPA mode
				window.googletag.cmd.push(() => {
					window.googletag.pubads().setPrivacySettings({
						restrictDataProcessing: state.ccpa.doNotSell,
					});
				});
			} else {
				let npaFlag;
				if (state.tcfv2) {
					// TCFv2 mode
					npaFlag =
						Object.keys(state.tcfv2.consents).length === 0 ||
						Object.values(state.tcfv2.consents).includes(false);
					canRun = getConsentFor('googletag', state);
				} else if (state.aus) {
					// AUS mode
					// canRun stays true, set NPA flag if consent is retracted
					npaFlag = !getConsentFor('googletag', state);
				}
				window.googletag.cmd.push(() => {
					window.googletag
						.pubads()
						.setRequestNonPersonalizedAds(npaFlag ? 1 : 0);
				});
			}
			// Prebid will already be loaded, and window.googletag is stubbed in `commercial.js`.
			// Just load googletag. Prebid will already be loaded, and googletag is already added to the window by Prebid.
			if (canRun) {
				loadScript(
					config.get(
						'libs.googletag',
						'//www.googletagservices.com/tag/js/gpt.js',
					),
					{ async: false },
				);
			}
		});
		return Promise.resolve();
	};

	if (commercialFeatures.dfpAdvertising) {
		// A promise error here, from a failed module load,
		// could be a network problem or an intercepted request.
		// Abandon the init sequence.
		setupAdvertising().then(adFreeSlotRemove).catch(removeAdSlots);

		return Promise.resolve();
	}

	return removeAdSlots();
};
