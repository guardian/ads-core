import {
	getConsentFor,
	onConsent,
} from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { loadScript, log } from '@guardian/libs';
import { EventTimer } from 'core/event-timer';
import { init as initMessenger } from 'core/messenger';
import { getPageTargeting } from 'lib/build-page-targeting';
import { commercialFeatures } from 'lib/commercial-features';
import { isInVariantSynchronous } from 'lib/experiments/ab';
import { elementsManager } from 'lib/experiments/tests/elements-manager';
import { getGoogleTagId, isUserLoggedInOktaRefactor } from 'lib/identity/api';
import { init as initMeasureAdLoad } from 'lib/messenger/measure-ad-load';
import raven from 'lib/raven';
import { reportError } from 'lib/utils/report-error';
import { init as background } from '../messenger/background';
import { init as sendClick } from '../messenger/click';
import { init as disableRefresh } from '../messenger/disable-refresh';
import { init as initGetPageTargeting } from '../messenger/get-page-targeting';
import { init as initGetPageUrl } from '../messenger/get-page-url';
import { init as getStyles } from '../messenger/get-stylesheet';
import { init as passback } from '../messenger/passback';
import { init as passbackRefresh } from '../messenger/passback-refresh';
import { init as resize } from '../messenger/resize';
import { init as scroll } from '../messenger/scroll';
import { init as type } from '../messenger/type';
import { init as viewport } from '../messenger/viewport';
import { removeSlots } from '../remove-slots';
import { createSlotFillListener } from './fill-slot-listener';
import { fillStaticAdvertSlots } from './fill-static-advert-slots';
import { onSlotLoad } from './on-slot-load';
import { onSlotRender } from './on-slot-render';
import { onSlotViewableFunction } from './on-slot-viewable';

initMessenger(
	[
		type,
		getStyles,
		initGetPageTargeting,
		initGetPageUrl,
		initMeasureAdLoad,
		passbackRefresh,
		resize,
		sendClick,
		background,
		disableRefresh,
		passback,
	],
	[scroll, viewport],
	reportError,
);

const setDfpListeners = (): void => {
	const pubads = window.googletag.pubads();

	pubads.addEventListener(
		'slotRenderEnded',
		raven.wrap<typeof onSlotRender>(onSlotRender),
	);
	pubads.addEventListener(
		'slotOnload',
		raven.wrap<typeof onSlotLoad>(onSlotLoad),
	);
	pubads.addEventListener('impressionViewable', onSlotViewableFunction());
};

const setPageTargeting = (consentState: ConsentState, isSignedIn: boolean) =>
	Object.entries(getPageTargeting(consentState, isSignedIn)).forEach(
		([key, value]) => {
			if (!value) return;
			window.googletag.pubads().setTargeting(key, value);
		},
	);

/**
 * Also known as PPID
 */
const setPublisherProvidedId = (): void => {
	void getGoogleTagId().then((googleTagId) => {
		if (googleTagId !== null) {
			window.googletag.pubads().setPublisherProvidedId(googleTagId);
		}
	});
};

export const init = (): Promise<void> => {
	// Don't create Google ads (for now) if loading Elements Manager
	if (isInVariantSynchronous(elementsManager, 'variant')) {
		return Promise.resolve();
	}

	const setupAdvertising = (): Promise<void> => {
		return onConsent().then(async (consentState: ConsentState) => {
			EventTimer.get().mark('googletagInitStart');
			let canRun = true;

			if (consentState.canTarget) {
				window.googletag.cmd.push(setPublisherProvidedId);
			}

			if (consentState.ccpa) {
				// CCPA mode
				// canRun stays true, set RDP flag
				window.googletag.cmd.push(() => {
					window.googletag.pubads().setPrivacySettings({
						restrictDataProcessing: !consentState.canTarget,
					});
				});
			} else if (consentState.tcfv2) {
				// TCFv2 mode
				canRun = getConsentFor('googletag', consentState);
			} else if (consentState.aus) {
				// AUS mode
				const nonPersonalizedAds = !getConsentFor(
					'googletag',
					consentState,
				);
				window.googletag.cmd.push(() => {
					window.googletag.pubads().setPrivacySettings({
						nonPersonalizedAds,
					});
				});
			}

			// Prebid will already be loaded, and window.googletag is stubbed in `commercial.js`.
			// Just load googletag. Prebid will already be loaded, and googletag is already added to the window by Prebid.
			if (canRun) {
				// Note: fillAdvertSlots isn't synchronous like most buffered cmds, it's a promise. It's put in here to ensure
				// it strictly follows preceding prepare-googletag work (and the module itself ensures dependencies are
				// fulfilled), but don't assume fillAdvertSlots is complete when queueing subsequent work using cmd.push
				const isSignedIn = await isUserLoggedInOktaRefactor();

				window.googletag.cmd.push(
					() => EventTimer.get().mark('googletagInitEnd'),
					setDfpListeners,
					() => {
						setPageTargeting(consentState, isSignedIn);
					},
					() => {
						createSlotFillListener();
						void fillStaticAdvertSlots();
					},
				);

				//DuckDuckGo blocks googletag request by default, creating a lot of noise in Sentry
				//This flow allows us to handle errors originating from DuckDuckGo without spamming Sentry
				loadScript(
					window.guardian.config.page.libs?.googletag ??
						'//securepubads.g.doubleclick.net/tag/js/gpt.js',
					{ async: false },
				).catch((error: Error) => {
					if (navigator.userAgent.includes('DuckDuckGo')) {
						log(
							'commercial',
							'🦆 Caught loadScript error on DuckDuckGo',
							error,
						);
					} else {
						throw error;
					}
				});
			}
			return Promise.resolve();
		});
	};

	if (commercialFeatures.shouldLoadGoogletag) {
		return (
			setupAdvertising()
				// on error, remove all slots
				.catch(removeSlots)
		);
	}

	return removeSlots();
};
