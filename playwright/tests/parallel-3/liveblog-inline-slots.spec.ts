import { expect, test } from '@playwright/test';
import { breakpoints } from '../../fixtures/breakpoints';
import { blogs } from '../../fixtures/pages';
import { cmpAcceptAll } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';

const blogPages = blogs.filter(
	(page) =>
		'expectedMinInlineSlotsOnDesktop' in page &&
		'expectedMinInlineSlotsOnMobile' in page,
);

test.describe('Slots and iframes load on liveblog pages', () => {
	blogPages.forEach(
		(
			{
				path,
				expectedMinInlineSlotsOnDesktop,
				expectedMinInlineSlotsOnMobile,
			},
			index,
		) => {
			breakpoints.forEach(({ breakpoint, width, height }) => {
				// little hack to set the min expected slots to a large number if either props are undefined
				const expectedMinSlotsOnPage =
					(breakpoint === 'mobile'
						? expectedMinInlineSlotsOnMobile
						: expectedMinInlineSlotsOnDesktop) ?? 999;

				test(`Test blog ${index} has at least ${expectedMinSlotsOnPage} inline total slots at breakpoint ${breakpoint}`, async ({
					page,
				}) => {
					await page.setViewportSize({
						width,
						height,
					});

					await loadPage(page, path);
					await cmpAcceptAll(page);

					await page
						.locator('.ad-slot--liveblog-inline')
						.first()
						.waitFor({ state: 'hidden', timeout: 30000 });

					const foundSlots = await page
						.locator('.ad-slot--liveblog-inline')
						.count();

					expect(foundSlots).toBeGreaterThanOrEqual(
						expectedMinSlotsOnPage,
					);

					// TODO check each iframe exists for the slots?
				});
			});
		},
	);
});
