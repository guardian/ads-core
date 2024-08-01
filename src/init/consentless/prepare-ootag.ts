import type { ConsentState } from '@guardian/libs';
import { loadScript, log } from '@guardian/libs';
import { buildPageTargetingConsentless } from 'core/targeting/build-page-targeting-consentless';
import { isUserInVariant } from 'experiments/ab';
import { optOutFrequencyCap } from 'experiments/tests/opt-out-frequency-cap';
import { commercialFeatures } from 'lib/commercial-features';
import { isUserLoggedInOktaRefactor } from 'lib/identity/api';

function initConsentless(consentState: ConsentState): Promise<void> {
	return new Promise((resolve) => {
		// Stub the command queue
		// @ts-expect-error -- it’s a stub, not the whole OO tag object
		window.ootag = {
			queue: [],
		};

		const isInFrequencyCapTest = isUserInVariant(
			optOutFrequencyCap,
			'variant',
		);

		window.ootag.queue.push(function () {
			// Ensures Opt Out logs are namespaced under Commercial
			window.ootag.logger = (...args: unknown[]) => {
				log('commercial', '[Opt Out Ads]', ...args);
			};

			window.ootag.initializeOo({
				publisher: 33,
				// We set our own custom logger above
				noLogging: 1,
				alwaysNoConsent: 1,
				noRequestsOnPageLoad: 1,
				frequencyScript: isInFrequencyCapTest
					? 'https://frequencycappingwithoutpersonaldata.com/script/iframe'
					: undefined,
				debug_forceCap: isInFrequencyCapTest ? 1 : undefined,
			});

			void isUserLoggedInOktaRefactor().then((isSignedIn) => {
				Object.entries(
					buildPageTargetingConsentless(
						consentState,
						commercialFeatures.adFree,
						isSignedIn,
					),
				).forEach(([key, value]) => {
					if (!value) {
						return;
					}
					window.ootag.addParameter(key, value);
				});
				resolve();
			});
		});

		void loadScript(
			'//cdn.optoutadvertising.com/script/ooguardian.v4.min.js',
		);
	});
}

export { initConsentless };
