import type { ABTest } from '@guardian/ab-core';

export const prebidMagnite: ABTest = {
	id: 'PrebidMagnite',
	author: '@commercial-dev',
	start: '2024-07-22',
	expiry: '2024-09-20',
	audience: 0 / 100,
	audienceOffset: 0 / 100,
	audienceCriteria: '',
	successMeasure: '',
	description: 'Test Prebid Magnite integration.',
	variants: [
		{
			id: 'control',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'variant',
			test: (): void => {
				/* no-op */
			},
		},
	],
	canRun: () => true,
};
