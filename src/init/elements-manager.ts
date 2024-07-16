import { onConsent } from '@guardian/libs';
import { initArticleBodyAdverts } from 'elements-manager/article-body-adverts';
import { ElementsManager } from 'elements-manager/elements-manager';
import { getPageTargeting } from 'lib/build-page-targeting';
import { isUserLoggedInOktaRefactor } from 'lib/identity/api';

const initElementsManager = async (): Promise<void> => {
	const [consentState, isSignedIn] = await Promise.all([
		onConsent(),
		isUserLoggedInOktaRefactor(),
	]);

	const pageTargeting = getPageTargeting(consentState, isSignedIn);

	const elementsManager = ElementsManager.init(pageTargeting);

	const staticAdverts = elementsManager.createStaticAdverts();

	void Promise.all(staticAdverts.map((ad) => ad.display()));

	void initArticleBodyAdverts();
};

export { initElementsManager };
