import config from '@guardian/frontend/static/src/javascripts/lib/config';
import { isGoogleProxy } from '@guardian/frontend/static/src/javascripts/lib/detect';
import { commercialFeatures } from '@guardian/frontend/static/src/javascripts/projects/common/modules/commercial/commercial-features';
import { initialise } from '../header-bidding/a9/a9';
import { dfpEnv } from './dfp-env';
import { _ } from './prepare-a9';

const { setupA9 } = _;

jest.mock(
	'@guardian/frontend/static/src/javascripts/projects/common/modules/commercial/geo-utils',
);

jest.mock(
	'@guardian/frontend/static/src/javascripts/projects/common/modules/commercial/commercial-features',
	() => ({
		commercialFeatures: {},
	}),
);

jest.mock('../header-bidding/a9/a9', () => ({
	initialise: jest.fn(),
}));

jest.mock('./Advert', () =>
	jest.fn().mockImplementation(() => ({ advert: jest.fn() })),
);

jest.mock('@guardian/frontend/static/src/javascripts/lib/a9-apstag', () =>
	jest.fn(),
);

jest.mock(
	'@guardian/frontend/static/src/javascripts/projects/common/modules/commercial/build-page-targeting',
	() => ({
		buildPageTargeting: jest.fn(),
	}),
);

jest.mock('../header-bidding/prebid/bid-config', () => ({
	isInVariant: jest.fn(),
}));

jest.mock('../header-bidding/utils', () => ({
	isInUsRegion: () => true,
}));

jest.mock('@guardian/consent-management-platform', () => ({
	onConsentChange: jest.fn(),
	getConsentFor: jest.fn(),
}));

jest.mock('@guardian/libs', () => ({
	loadScript: () => Promise.resolve(),
}));

const fakeUserAgent = (userAgent) => {
	const userAgentObject = {};
	userAgentObject.get = () => userAgent;
	userAgentObject.configurable = true;
	Object.defineProperty(navigator, 'userAgent', userAgentObject);
};

describe('init', () => {
	const originalUA = navigator.userAgent;

	beforeEach(() => {
		jest.clearAllMocks();
		fakeUserAgent(originalUA);
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should initialise A9 when A9 switch is ON and advertising is on and ad-free is off', async () => {
		dfpEnv.hbImpl = { a9: true, prebid: false };
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		await setupA9();
		expect(initialise).toBeCalled();
	});

	it('should initialise A9 when both prebid and a9 switches are ON and advertising is on and ad-free is off', async () => {
		dfpEnv.hbImpl = { a9: true, prebid: true };
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		await setupA9();
		expect(initialise).toBeCalled();
	});

	it('should not initialise A9 when useragent is Google Web Preview', async () => {
		fakeUserAgent('Google Web Preview');
		await setupA9();
		expect(initialise).not.toBeCalled();
	});

	it('should not initialise A9 when no external demand', async () => {
		dfpEnv.hbImpl = { a9: false, prebid: false };
		await setupA9();
		expect(initialise).not.toBeCalled();
	});

	it('should not initialise a9 when advertising is switched off', async () => {
		dfpEnv.hbImpl = { a9: true, prebid: false };
		commercialFeatures.dfpAdvertising = false;
		commercialFeatures.adFree = false;
		await setupA9();
		expect(initialise).not.toBeCalled();
	});

	it('should not initialise a9 when ad-free is on', async () => {
		dfpEnv.hbImpl = { a9: true, prebid: false };
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = true;
		await setupA9();
		expect(initialise).not.toBeCalled();
	});

	it('should not initialise a9 when the page has a pageskin', async () => {
		dfpEnv.hbImpl = { a9: true, prebid: false };
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		config.set('page.hasPageSkin', true);
		await setupA9();
		expect(initialise).not.toBeCalled();
	});

	it('should initialise a9 when the page has no pageskin', async () => {
		dfpEnv.hbImpl = { a9: true, prebid: false };
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		config.set('page.hasPageSkin', false);
		await setupA9();
		expect(initialise).toBeCalled();
	});

	it('should not initialise a9 on the secure contact pages', async () => {
		dfpEnv.hbImpl = { a9: true, prebid: false };
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		commercialFeatures.isSecureContact = true;
		await setupA9();
		expect(initialise).not.toBeCalled();
	});

	it('isGoogleWebPreview should return false with no navigator or useragent', () => {
		expect(isGoogleProxy()).toBe(false);
	});

	it('isGoogleWebPreview should return false with no navigator or useragent', () => {
		fakeUserAgent('Firefox');
		expect(isGoogleProxy()).toBe(false);
	});

	it('isGoogleWebPreview should return true with Google Web Preview useragent', () => {
		fakeUserAgent('Google Web Preview');
		expect(isGoogleProxy()).toBe(true);
	});

	it('isGoogleWebPreview should return true with Google Web Preview useragent', () => {
		fakeUserAgent('googleweblight');
		expect(isGoogleProxy()).toBe(true);
	});
});
