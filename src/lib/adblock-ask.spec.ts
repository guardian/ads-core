import { pageShouldHideReaderRevenue } from 'lib/contributions-utilities';
import { shouldHideSupportMessaging } from 'lib/user-features';
import { _ } from './adblock-ask';

const { params, canShow } = _;

jest.mock('lib/contributions-utilities');
jest.mock('lib/user-features');
jest.mock('ophan-tracker-js', () => null);
jest.mock('lib/raven');

describe('adblock-ask', () => {
	it('has the correct URL params', () => {
		expect(params.toString()).toBe(
			'acquisitionData=%7B%22componentType%22%3A%22ACQUISITIONS_OTHER%22%2C%22source%22%3A%22GUARDIAN_WEB%22%2C%22campaignCode%22%3A%22shady_pie_open_2019%22%2C%22componentId%22%3A%22shady_pie_open_2019%22%7D&INTCMP=shady_pie_open_2019',
		);
	});

	it('should show if possible', async () => {
		window.guardian.config.page.hasShowcaseMainElement = false;
		(pageShouldHideReaderRevenue as jest.Mock).mockReturnValue(false);
		(shouldHideSupportMessaging as jest.Mock).mockResolvedValue(false);

		expect(await canShow()).toBe(true);
	});

	it.each([
		['page.hasShowcaseMainElement', true, false, false],
		['pageShouldHideReaderRevenue', false, true, false],
		['shouldHideSupportMessaging', false, false, true],
	])('should not show if is %s is true', async (_, a, b, c) => {
		window.guardian.config.page.hasShowcaseMainElement = a;
		(pageShouldHideReaderRevenue as jest.Mock).mockReturnValue(b);
		(shouldHideSupportMessaging as jest.Mock).mockResolvedValue(c);

		expect(await canShow()).toBe(false);
	});
});
