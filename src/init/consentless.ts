import type { ConsentState } from '@guardian/libs';
import { initMessenger } from 'core';
import { init as background } from 'core/messenger/background';
import { init as resize } from 'core/messenger/resize';
import { init as type } from 'core/messenger/type';
import { initArticleBodyAdverts } from 'init/consentless/dynamic/article-body-adverts';
import { initExclusionSlot } from 'init/consentless/dynamic/exclusion-slot';
import { initFixedSlots } from 'init/consentless/init-fixed-slots';
import { initConsentless } from 'init/consentless/prepare-ootag';
import { reloadPageOnConsentChange } from 'init/shared/reload-page-on-consent-change';
import { init as setAdTestCookie } from 'init/shared/set-adtest-cookie';
import { init as setAdTestInLabelsCookie } from 'init/shared/set-adtest-in-labels-cookie';

const bootConsentless = async (consentState: ConsentState): Promise<void> => {
	const consentlessModuleList = [
		initMessenger([background, resize, type], [], reportError),
		setAdTestCookie(),
		setAdTestInLabelsCookie(),
		initConsentless(consentState),
		initExclusionSlot(),
		initFixedSlots(),
		initArticleBodyAdverts(),
		reloadPageOnConsentChange(),
	];

	await Promise.all(consentlessModuleList);

	// Since we're in single-request mode
	// Call this once all ad slots are present on the page
	window.ootag.makeRequests();
};

export { bootConsentless };
