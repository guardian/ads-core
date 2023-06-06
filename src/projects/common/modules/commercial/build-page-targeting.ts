import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { log } from '@guardian/libs';
import { once } from 'lodash-es';
import type { PageTargeting } from 'core/targeting/build-page-targeting';
import { buildPageTargeting } from 'core/targeting/build-page-targeting';
import { amIUsed } from 'projects/commercial/am-i-used';
import { getSynchronousParticipations } from 'projects/common/modules/experiments/ab';
import { removeFalseyValues } from '../../../commercial/modules/header-bidding/utils';
import { commercialFeatures } from './commercial-features';

const formatAppNexusTargeting = (obj: Record<string, string | string[]>) => {
	const asKeyValues = Object.entries(obj).map((entry) => {
		const [key, value] = entry;
		return Array.isArray(value)
			? value.map((nestedValue) => `${key}=${nestedValue}`)
			: `${key}=${value}`;
	});

	const flattenDeep = Array.prototype.concat.apply([], asKeyValues);
	return flattenDeep.join(',');
};

const buildAppNexusTargetingObject = once(
	(pageTargeting: PageTargeting): Record<string, string | string[]> =>
		removeFalseyValues({
			sens: pageTargeting.sens,
			pt1: pageTargeting.url,
			pt2: pageTargeting.edition,
			pt3: pageTargeting.ct,
			pt4: pageTargeting.p,
			pt5: pageTargeting.k,
			pt6: pageTargeting.su,
			pt7: pageTargeting.bp,
			pt9: [pageTargeting.pv, pageTargeting.co, pageTargeting.tn].join(
				'|',
			),
			permutive: pageTargeting.permutive,
		}),
);

const buildAppNexusTargeting = once((pageTargeting: PageTargeting): string =>
	formatAppNexusTargeting(buildAppNexusTargetingObject(pageTargeting)),
);

const getPageTargeting = (consentState: ConsentState): PageTargeting => {
	const { page } = window.guardian.config;

	const pageTargeting = buildPageTargeting({
		adFree: commercialFeatures.adFree,
		clientSideParticipations: getSynchronousParticipations(),
		consentState,
	});

	// third-parties wish to access our page targeting, before the googletag script is loaded.
	page.appNexusPageTargeting = buildAppNexusTargeting(pageTargeting);

	// This can be removed once we get sign-off from third parties who prefer to use appNexusPageTargeting.
	page.pageAdTargeting = pageTargeting;

	log('commercial', 'pageTargeting object:', pageTargeting);

	amIUsed('build-page-targeting.ts', 'getPageTargeting');

	return pageTargeting;
};

export {
	getPageTargeting,
	buildAppNexusTargeting,
	buildAppNexusTargetingObject,
};
