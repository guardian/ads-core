import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { initArticleInline } from '../projects/commercial/modules/consentless/dynamic/article-inline';
import { initExclusionSlot } from '../projects/commercial/modules/consentless/dynamic/exclusion-slot';
import { initLiveblogInline } from '../projects/commercial/modules/consentless/dynamic/liveblog-inline';
import { initFixedSlots } from '../projects/commercial/modules/consentless/init-fixed-slots';
import { initConsentless } from '../projects/commercial/modules/consentless/prepare-ootag';
import { init as setAdTestCookie } from '../projects/commercial/modules/set-adtest-cookie';
import { init as setAdTestInLabelsCookie } from '../projects/commercial/modules/set-adtest-in-labels-cookie';

const bootConsentless = async (consentState: ConsentState): Promise<void> => {
	/*  In the consented ad stack, we set the ad free cookie for users who
		don't consent to targeted ads in order to hide empty ads slots.
		We remove the cookie here so that we can show Opt Out ads.
		TODO: Stop setting ad free cookie for users who opt out when
		consentless ads are rolled out to all users.
 	*/

	await Promise.all([
		setAdTestCookie(),
		setAdTestInLabelsCookie(),
		initConsentless(consentState),
		initExclusionSlot(),
		initFixedSlots(),
		initArticleInline(),
		initLiveblogInline(),
	]);

	// Since we're in single-request mode
	// Call this once all ad slots are present on the page
	window.ootag.makeRequests();
};

export { bootConsentless };
