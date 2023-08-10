import { getStage, getTestUrl } from '../../lib/util';
import type { Page } from './Page';

const stage = getStage();

const liveblogs: Page[] = [
	{
		path: getTestUrl(
			stage,
			'/politics/live/2022/jan/31/uk-politics-live-omicron-nhs-workers-coronavirus-vaccines-no-10-sue-gray-report',
			'liveblog',
		),
		name: 'live-update',
	},
	{
		path: getTestUrl(
			stage,
			'/business/live/2023/aug/07/halifax-house-prices-gradual-drop-annual-fall-in-july-interest-rates-mortgages-business-live',
			'liveblog',
		),
		expectedMinInlineSlotsOnDesktop: 4,
		expectedMinInlineSlotsOnMobile: 5,
	},
];

export { liveblogs };
