import { test } from '@playwright/test';
import { articles } from '../../fixtures/pages';
import { acceptAll } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';

const gamUrl = 'https://securepubads.g.doubleclick.net/gampad/ads?**';

// const intercept = (page: Page, urlPattern: string) => {
// 	// return the promise and don't await so it can be awaited on by the test where necessary
// 	return page.route(urlPattern, async route => {
// 		route.fulfill({
// 			body: JSON.stringify({ bodyOverride })
// 		});
// 	});
// }

test.describe('GAM targeting', () => {
	test('checks that a request is made', async ({ page }) => {
		const gamResponsePromise = page.waitForResponse(gamUrl, {});
		await loadPage(page, articles[0].path);
		await acceptAll(page);
		await gamResponsePromise;
	});

	// 	it(`checks the gdpr_consent param`, () => {
	// 		const { path } = articles[0];
	// 		cy.visit(path);

	// 		cy.intercept({ url: gamUrl }, function (req) {
	// 			const url = new URL(req.url);

	// 			expect(url.searchParams.get('gdpr_consent')).to.not.be.undefined;
	// 		}).as('gamRequest');

	// 		cy.wait('@gamRequest', { timeout: 30000 });
	// 	});

	// 	it(`checks sensitive content is marked as sensitive`, () => {
	// 		const sensitivePage = allPages.find(
	// 			(page) => page?.name === 'sensitive-content',
	// 		);
	// 		if (!sensitivePage)
	// 			throw new Error('No sensitive articles found to run test.');

	// 		cy.visit(sensitivePage.path);

	// 		cy.intercept({ url: gamUrl }, function (req) {
	// 			const url = new URL(req.url);

	// 			const custParams = decodeURIComponent(
	// 				url.searchParams.get('cust_params') || '',
	// 			);
	// 			const decodedCustParams = new URLSearchParams(custParams);

	// 			expect(decodedCustParams.get('sens')).to.equal('t');
	// 		}).as('gamRequest');

	// 		cy.wait('@gamRequest', { timeout: 30000 });
	// 	});
	// });

	// describe('Prebid targeting', () => {
	// 	const interceptGamRequest = () =>
	// 		cy.intercept(
	// 			{
	// 				url: gamUrl,
	// 			},
	// 			function (req) {
	// 				const url = new URL(req.url);

	// 				const targetingParams = decodeURIComponent(
	// 					url.searchParams.get('prev_scp') || '',
	// 				);
	// 				const targeting = new URLSearchParams(targetingParams);
	// 				if (targeting.get('hb_bidder') === 'criteo') {
	// 					Object.entries(wins.criteo.targeting).forEach(
	// 						([key, value]) => {
	// 							expect(targeting.get(key)).to.equal(value);
	// 						},
	// 					);
	// 				}
	// 			},
	// 		);

	// 	before(() => {
	// 		bidderURLs.forEach((url) => {
	// 			cy.intercept(url, (req) => {
	// 				if (req.url.includes(wins.criteo.url)) {
	// 					req.reply({ body: wins.criteo.response });
	// 				} else {
	// 					req.reply({
	// 						statusCode: 204,
	// 					});
	// 				}
	// 			});
	// 		});
	// 	});

	// 	// This test is flaky, so we're skipping it for now
	// 	it.skip(`prebid winner should display ad and send targeting to GAM`, () => {
	// 		const { path } = articles[0];

	// 		interceptGamRequest();

	// 		const url = new URL(path);
	// 		url.searchParams.set('adrefresh', 'false');
	// 		url.searchParams.delete('adtest');
	// 		cy.visit(url.toString());

	// 		cy.getIframeBody('google_ads_iframe_')
	// 			.find('[data-cy="test-creative"]')
	// 			.should('exist');
	// 	});
});
