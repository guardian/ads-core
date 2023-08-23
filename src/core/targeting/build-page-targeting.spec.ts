import { cmp as cmp_ } from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import type { TCFv2ConsentState } from '@guardian/consent-management-platform/dist/types/tcfv2';
import { setCookie, storage } from '@guardian/libs';
import { getAuthStatus as getAuthStatus_ } from 'lib/identity/api';
import type { AuthStatus } from 'lib/identity/api';
import { getLocale as getLocale_ } from '../lib/get-locale';
import type { Edition } from '../types';
import { buildPageTargeting } from './build-page-targeting';

const getLocale = getLocale_ as jest.MockedFunction<typeof getLocale_>;

const cmp = {
	hasInitialised: cmp_.hasInitialised as jest.MockedFunction<
		typeof cmp_.hasInitialised
	>,
	willShowPrivacyMessageSync:
		cmp_.willShowPrivacyMessageSync as jest.MockedFunction<
			typeof cmp_.willShowPrivacyMessageSync
		>,
};

jest.mock('../lib/get-locale', () => ({
	getLocale: jest.fn(),
}));

jest.mock('@guardian/consent-management-platform', () => ({
	cmp: {
		hasInitialised: jest.fn(),
		willShowPrivacyMessageSync: jest.fn(),
	},
}));

jest.mock('../../lib/identity/api', () => ({
	isUserLoggedInOktaRefactor: () => true,
	getAuthStatus: jest.fn(),
	getOptionsHeadersWithOkta: jest.fn(),
}));

const getAuthStatus = getAuthStatus_ as jest.MockedFunction<
	typeof getAuthStatus_
>;

const mockViewport = (width: number, height: number): void => {
	Object.defineProperties(window, {
		innerWidth: {
			value: width,
		},
		innerHeight: {
			value: height,
		},
	});
};

// CCPA
const ccpaWithConsentMock: ConsentState = {
	ccpa: { doNotSell: false },
	canTarget: true,
	framework: 'ccpa',
};

const ccpaWithoutConsentMock: ConsentState = {
	ccpa: { doNotSell: true },
	canTarget: false,
	framework: 'ccpa',
};

// AUS
const ausWithConsentMock: ConsentState = {
	aus: { personalisedAdvertising: true },
	canTarget: true,
	framework: 'aus',
};

const ausWithoutConsentMock: ConsentState = {
	aus: { personalisedAdvertising: false },
	canTarget: false,
	framework: 'aus',
};

// TCFv2
const defaultState: TCFv2ConsentState = {
	consents: { 1: false },
	eventStatus: 'tcloaded',
	vendorConsents: { abc: false },
	addtlConsent: 'xyz',
	gdprApplies: true,
	tcString: 'YAAA',
};

const tcfv2WithConsentMock: ConsentState = {
	tcfv2: {
		...defaultState,
		consents: { '1': true, '2': true },
		eventStatus: 'useractioncomplete',
	},
	canTarget: true,
	framework: 'tcfv2',
};

const tcfv2WithoutConsentMock: ConsentState = {
	tcfv2: { ...defaultState, consents: {}, eventStatus: 'cmpuishown' },
	canTarget: false,
	framework: 'tcfv2',
};

const tcfv2NullConsentMock: ConsentState = {
	tcfv2: undefined,
	canTarget: false,
	framework: 'tcfv2',
};

const tcfv2MixedConsentMock: ConsentState = {
	tcfv2: {
		...defaultState,
		consents: { '1': false, '2': true },
		eventStatus: 'useractioncomplete',
	},
	canTarget: false,
	framework: 'tcfv2',
};

const emptyConsent: ConsentState = {
	canTarget: false,
	framework: null,
};

describe('Build Page Targeting', () => {
	beforeEach(() => {
		window.guardian = {
			config: {
				ophan: { pageViewId: 'presetOphanPageViewId' },
				page: {
					edition: 'US' as Edition,
					pageId: 'football/series/footballweekly',
					videoDuration: 63,
					section: 'football',
					sharedAdTargeting: {
						bl: ['blog'],
						br: 'p',
						co: ['gabrielle-chan'],
						ct: 'video',
						edition: 'us',
						k: [
							'prince-charles-letters',
							'uk/uk',
							'prince-charles',
						],
						ob: 't',
						p: 'ng',
						se: ['filmweekly'],
						su: ['5'],
						tn: ['news'],
						url: '/football/series/footballweekly',
					},
					isSensitive: false,
					webPublicationDate: 608857200,
				} as unknown as typeof window.guardian.config.page,
			},
		} as typeof window.guardian;

		setCookie({ name: 'adtest', value: 'ng101' });

		mockViewport(0, 0);

		setCookie({ name: 'GU_U', value: 'test' });

		storage.local.setRaw('gu.alreadyVisited', String(0));

		getLocale.mockReturnValue('US');

		getAuthStatus.mockReturnValue(
			Promise.resolve({ kind: 'SignedInWithOkta' } as AuthStatus),
		);

		jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

		expect.hasAssertions();
	});

	afterEach(() => {
		jest.spyOn(global.Math, 'random').mockRestore();
		jest.resetAllMocks();
		storage.local.clear();
	});

	it('should exist', () => {
		expect(buildPageTargeting).toBeDefined();
	});

	it('should build correct page targeting', async () => {
		const pageTargeting = await buildPageTargeting({
			adFree: false,
			clientSideParticipations: {},
			consentState: emptyConsent,
		});

		expect(pageTargeting.sens).toBe('f');
		expect(pageTargeting.edition).toBe('us');
		expect(pageTargeting.ct).toBe('video');
		expect(pageTargeting.p).toBe('ng');
		expect(pageTargeting.su).toEqual(['5']);
		expect(pageTargeting.bp).toBe('mobile');
		expect(pageTargeting.at).toBe('ng101');
		expect(pageTargeting.si).toEqual('t');
		expect(pageTargeting.co).toEqual(['gabrielle-chan']);
		expect(pageTargeting.bl).toEqual(['blog']);
		expect(pageTargeting.tn).toEqual(['news']);
		expect(pageTargeting.vl).toEqual('90');
		expect(pageTargeting.pv).toEqual('presetOphanPageViewId');
		expect(pageTargeting.pa).toEqual('f');
		expect(pageTargeting.cc).toEqual('US');
		expect(pageTargeting.rp).toEqual('dotcom-platform');
		expect(pageTargeting.rc).toEqual('7');
		expect(pageTargeting.allkw).toEqual([
			'footballweekly',
			'prince-charles-letters',
			'uk/uk',
			'prince-charles',
		]);
	});

	it('should set correct personalized ad (pa) param', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithConsentMock,
				})
			).pa,
		).toBe('t');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithoutConsentMock,
				})
			).pa,
		).toBe('f');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2NullConsentMock,
				})
			).pa,
		).toBe('f');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2MixedConsentMock,
				})
			).pa,
		).toBe('f');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: ccpaWithConsentMock,
				})
			).pa,
		).toBe('t');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: ccpaWithoutConsentMock,
				})
			).pa,
		).toBe('f');
	});

	it('Should correctly set the RDP flag (rdp) param', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithoutConsentMock,
				})
			).rdp,
		).toBe('na');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2NullConsentMock,
				})
			).rdp,
		).toBe('na');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: ccpaWithConsentMock,
				})
			).rdp,
		).toBe('f');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: ccpaWithoutConsentMock,
				})
			).rdp,
		).toBe('t');
	});

	it('Should correctly set the TCFv2 (consent_tcfv2, cmp_interaction) params', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithConsentMock,
				})
			).consent_tcfv2,
		).toBe('t');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithConsentMock,
				})
			).cmp_interaction,
		).toBe('useractioncomplete');

		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithoutConsentMock,
				})
			).consent_tcfv2,
		).toBe('f');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithoutConsentMock,
				})
			).cmp_interaction,
		).toBe('cmpuishown');

		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2MixedConsentMock,
				})
			).consent_tcfv2,
		).toBe('f');
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2MixedConsentMock,
				})
			).cmp_interaction,
		).toBe('useractioncomplete');
	});

	it('should set correct edition param', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: emptyConsent,
				})
			).edition,
		).toBe('us');
	});

	it('should set correct se param', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: emptyConsent,
				})
			).se,
		).toEqual(['filmweekly']);
	});

	it('should set correct k param', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: emptyConsent,
				})
			).k,
		).toEqual(['prince-charles-letters', 'uk/uk', 'prince-charles']);
	});

	it('should set correct ab param', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {
						someTest: {
							variant: 'variantName',
						},
					},
					consentState: emptyConsent,
				})
			).ab,
		).toEqual(['someTest-variantName']);
	});

	it('should set Observer flag for Observer content', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: emptyConsent,
				})
			).ob,
		).toEqual('t');
	});

	it('should set correct branding param for paid content', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: emptyConsent,
				})
			).br,
		).toEqual('p');
	});

	it('should not contain an ad-free targeting value', async () => {
		expect(
			(
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: emptyConsent,
				})
			).af,
		).toBeUndefined();
	});

	it('should remove empty values', async () => {
		window.guardian.config.page = {
			// pageId should always be defined
			pageId: 'football/series/footballweekly',
		} as typeof window.guardian.config.page;
		window.guardian.config.ophan = { pageViewId: '123456' };

		expect(
			await buildPageTargeting({
				adFree: false,
				clientSideParticipations: {},
				consentState: emptyConsent,
			}),
		).toEqual({
			at: 'ng101',
			bp: 'mobile',
			cc: 'US',
			cmp_interaction: 'na',
			consent_tcfv2: 'na',
			dcre: 'f',
			fr: '0',
			inskin: 'f',
			pa: 'f',
			pv: '123456',
			rc: '7',
			rdp: 'na',
			rp: 'dotcom-platform',
			sens: 'f',
			si: 't',
			skinsize: 's',
			urlkw: ['footballweekly'],
			allkw: ['footballweekly'],
		});
	});

	describe('Breakpoint targeting', () => {
		it('should set correct breakpoint targeting for a mobile device', async () => {
			mockViewport(320, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('mobile');
		});

		it('should set correct breakpoint targeting for a medium mobile device', async () => {
			mockViewport(375, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('mobile');
		});

		it('should set correct breakpoint targeting for a mobile device in landscape mode', async () => {
			mockViewport(480, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('mobile');
		});

		it('should set correct breakpoint targeting for a phablet device', async () => {
			mockViewport(660, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('tablet');
		});

		it('should set correct breakpoint targeting for a tablet device', async () => {
			mockViewport(740, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('tablet');
		});

		it('should set correct breakpoint targeting for a desktop device', async () => {
			mockViewport(980, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('desktop');
		});

		it('should set correct breakpoint targeting for a leftCol device', async () => {
			mockViewport(1140, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('desktop');
		});

		it('should set correct breakpoint targeting for a wide device', async () => {
			mockViewport(1300, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).bp,
			).toEqual('desktop');
		});
	});

	describe('Build Page Targeting (ad-free)', () => {
		it('should set the ad-free param to t when enabled', async () => {
			expect(
				(
					await buildPageTargeting({
						adFree: true,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).af,
			).toBe('t');
		});
	});

	describe('Permutive', () => {
		it('should set the permutive param to the value from localstorage', async () => {
			const PERMUTIVE_KEY = `_papns`;
			storage.local.setRaw(PERMUTIVE_KEY, '[1, 2, 3]');

			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: ccpaWithConsentMock,
					})
				).permutive,
			).toEqual(['1', '2', '3']);
		});
	});

	describe('Already visited frequency', () => {
		it('can pass a value of five or less', async () => {
			storage.local.setRaw('gu.alreadyVisited', String(5));
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: ccpaWithConsentMock,
					})
				).fr,
			).toEqual('5');
		});

		it('between five and thirty, includes it in a bucket in the form "x-y"', async () => {
			storage.local.setRaw('gu.alreadyVisited', String(18));
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: ccpaWithConsentMock,
					})
				).fr,
			).toEqual('16-19');
		});

		it('over thirty, includes it in the bucket "30plus"', async () => {
			storage.local.setRaw('gu.alreadyVisited', String(300));
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: ccpaWithConsentMock,
					})
				).fr,
			).toEqual('30plus');
		});

		it('passes a value of 0 if the value is not stored', async () => {
			storage.local.remove('gu.alreadyVisited');
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: ccpaWithConsentMock,
					})
				).fr,
			).toEqual('0');
		});

		it('passes a value of 0 if the number is invalid', async () => {
			storage.local.setRaw('gu.alreadyVisited', 'not-a-number');
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: ccpaWithConsentMock,
					})
				).fr,
			).toEqual('0');
		});

		it('passes a value of 0 if consent is not given', async () => {
			storage.local.setRaw('gu.alreadyVisited', String(5));
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: ccpaWithoutConsentMock,
					})
				).fr,
			).toEqual('0');
		});

		it('passes a value of 0 if empty consent', async () => {
			storage.local.setRaw('gu.alreadyVisited', String(5));
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).fr,
			).toEqual('0');
		});
	});

	describe('Referrer', () => {
		it('should set ref to Facebook', async () => {
			jest.spyOn(document, 'referrer', 'get').mockReturnValue(
				'https://www.facebook.com/feel-the-force',
			);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).ref,
			).toEqual('facebook');
		});

		it('should set ref to Twitter', async () => {
			jest.spyOn(document, 'referrer', 'get').mockReturnValue(
				'https://t.co/you-must-unlearn-what-you-have-learned',
			);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).ref,
			).toEqual('twitter');
		});

		it('should set ref to reddit', async () => {
			jest.spyOn(document, 'referrer', 'get').mockReturnValue(
				'https://www.reddit.com/its-not-my-fault',
			);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).ref,
			).toEqual('reddit');
		});

		it('should set ref to google', async () => {
			jest.spyOn(document, 'referrer', 'get').mockReturnValue(
				'https://www.google.com/i-find-your-lack-of-faith-distrubing',
			);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).ref,
			).toEqual('google');
		});

		it('should set ref empty string if referrer does not match', async () => {
			jest.spyOn(document, 'referrer', 'get').mockReturnValue(
				'https://theguardian.com',
			);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).ref,
			).toEqual(undefined);
		});
	});

	describe('URL Keywords', () => {
		it('should return correct keywords from pageId', async () => {
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).urlkw,
			).toEqual(['footballweekly']);
		});

		it('should extract multiple url keywords correctly', async () => {
			window.guardian.config.page.pageId =
				'stage/2016/jul/26/harry-potter-cursed-child-review-palace-theatre-london';
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).urlkw,
			).toEqual([
				'harry',
				'potter',
				'cursed',
				'child',
				'review',
				'palace',
				'theatre',
				'london',
			]);
		});

		it('should get correct keywords when trailing slash is present', async () => {
			window.guardian.config.page.pageId =
				'stage/2016/jul/26/harry-potter-cursed-child-review-palace-theatre-london/';
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).urlkw,
			).toEqual([
				'harry',
				'potter',
				'cursed',
				'child',
				'review',
				'palace',
				'theatre',
				'london',
			]);
		});
	});

	describe('inskin targeting', () => {
		it('should not allow inskin if cmp has not initialised', async () => {
			cmp.hasInitialised.mockReturnValue(false);
			cmp.willShowPrivacyMessageSync.mockReturnValue(false);
			mockViewport(1920, 1080);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).inskin,
			).toBe('f');
		});

		it('should not allow inskin if cmp will show a banner', async () => {
			cmp.hasInitialised.mockReturnValue(true);
			cmp.willShowPrivacyMessageSync.mockReturnValue(true);
			mockViewport(1920, 1080);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).inskin,
			).toBe('f');
		});
	});

	describe('skinsize targetting', () => {
		it.each([
			['s', 1280],
			['s', 1440],
			['s', 1559],
			['l', 1560],
			['l', 1561],
			['l', 1920],
			['l', 2560],
		])(
			"should return '%s' if viewport width is %s",
			async (expected, width) => {
				cmp.hasInitialised.mockReturnValue(true);
				cmp.willShowPrivacyMessageSync.mockReturnValue(false);
				mockViewport(width, 800);
				expect(
					(
						await buildPageTargeting({
							adFree: false,
							clientSideParticipations: {},
							consentState: emptyConsent,
						})
					).skinsize,
				).toBe(expected);
			},
		);

		it("should return 's' if vp does not have a width", async () => {
			mockViewport(0, 0);
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).skinsize,
			).toBe('s');
		});
	});

	describe('ad manager group value', () => {
		const STORAGE_KEY = 'gu.adManagerGroup';
		it('if present in localstorage, use value from storage', async () => {
			storage.local.setRaw(STORAGE_KEY, '10');
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: tcfv2WithConsentMock,
					})
				).amtgrp,
			).toEqual('10');
			storage.local.remove(STORAGE_KEY);
		});

		it.each([
			[ccpaWithConsentMock, '9'],
			[ccpaWithoutConsentMock, '9'],

			[ausWithConsentMock, '9'],
			[ausWithoutConsentMock, '9'],

			[tcfv2WithConsentMock, '9'],
			[tcfv2WithoutConsentMock, undefined],
			[tcfv2MixedConsentMock, undefined],
			[tcfv2MixedConsentMock, undefined],
		])('Framework %p => amtgrp is %s', async (consentState, value) => {
			storage.local.setRaw(STORAGE_KEY, '9');
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: consentState,
					})
				).amtgrp,
			).toEqual(value);
			storage.local.remove(STORAGE_KEY);
		});

		it('if not present in localstorage, generate a random group 1-12, store in localstorage', async () => {
			// restore Math.random for this test so we can assert the group value range is 1-12
			jest.spyOn(global.Math, 'random').mockRestore();
			const valueGenerated = (
				await buildPageTargeting({
					adFree: false,
					clientSideParticipations: {},
					consentState: tcfv2WithConsentMock,
				})
			).amtgrp;
			expect(valueGenerated).toBeDefined();
			expect(Number(valueGenerated)).toBeGreaterThanOrEqual(1);
			expect(Number(valueGenerated)).toBeLessThanOrEqual(12);
			const valueFromStorage = storage.local.getRaw(STORAGE_KEY);
			expect(valueFromStorage).toEqual(valueGenerated);
		});
	});

	describe('dcre dotcom-rendering-eligible', () => {
		it('should be true if page is a dotcom-rendering-eligible page', async () => {
			window.guardian.config.page.dcrCouldRender = true;
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).dcre,
			).toBe('t');
		});

		it('should be false if page is not a dotcom-rendering-eligible page', async () => {
			window.guardian.config.page.dcrCouldRender = false;
			expect(
				(
					await buildPageTargeting({
						adFree: false,
						clientSideParticipations: {},
						consentState: emptyConsent,
					})
				).dcre,
			).toBe('f');
		});
	});
});
