import {
	getConsentFor,
	onConsent,
} from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import type { TCFv2ConsentState } from '@guardian/consent-management-platform/dist/types/tcfv2';
import { log } from '@guardian/libs';
import { commercialFeatures } from 'lib/commercial-features';
import { isInCanada } from 'lib/utils/geo-utils';
import { prebid } from '../header-bidding/prebid/prebid';
import { _ } from './prepare-prebid';

const { setupPrebid } = _;

jest.mock('lib/utils/geo-utils', () => ({
	isInCanada: jest.fn(() => false),
}));

jest.mock('lib/experiments/ab', () => ({
	isInABTestSynchronous: jest.fn().mockReturnValue(false),
	isInVariantSynchronous: jest.fn().mockReturnValue(false),
}));

jest.mock('lib/raven');

jest.mock('lib/commercial-features', () => ({
	commercialFeatures: {},
}));

jest.mock('../header-bidding/prebid/prebid', () => ({
	prebid: {
		initialise: jest.fn(),
	},
}));

jest.mock('./Advert', () =>
	jest.fn().mockImplementation(() => ({ advert: jest.fn() })),
);

jest.mock('lib/build-page-targeting', () => ({
	getPageTargeting: jest.fn(),
}));

jest.mock('../header-bidding/prebid/bid-config', () => ({
	isInVariant: jest.fn(),
}));

jest.mock('../header-bidding/utils', () => ({
	shouldIncludeOnlyA9: false,
}));

jest.mock('@guardian/consent-management-platform', () => ({
	onConsent: jest.fn(),
	getConsentFor: jest.fn(),
}));

jest.mock('@guardian/libs', () => ({
	log: jest.fn(),
}));

const mockOnConsent = (consentState: ConsentState) =>
	(onConsent as jest.Mock).mockReturnValueOnce(Promise.resolve(consentState));

const mockGetConsentFor = (hasConsent: boolean) =>
	(getConsentFor as jest.Mock).mockReturnValueOnce(hasConsent);

const defaultTCFv2State: TCFv2ConsentState = {
	consents: { 1: false },
	eventStatus: 'tcloaded',
	vendorConsents: { abc: false },
	addtlConsent: 'xyz',
	gdprApplies: true,
	tcString: 'YAAA',
};

const tcfv2WithConsent = {
	tcfv2: {
		...defaultTCFv2State,
		vendorConsents: { '5f92a62aa22863685f4daa4c': true },
	},
	canTarget: true,
	framework: 'tcfv2',
} as ConsentState;

const tcfv2WithoutConsent = {
	tcfv2: {
		...defaultTCFv2State,
		vendorConsents: { '5f92a62aa22863685f4daa4c': false },
	},
	canTarget: false,
	framework: 'tcfv2',
} as ConsentState;

const ccpaWithConsent = {
	ccpa: { doNotSell: false },
	canTarget: true,
	framework: 'ccpa',
} as ConsentState;

const ccpaWithoutConsent = {
	ccpa: { doNotSell: true },
	canTarget: false,
	framework: 'ccpa',
} as ConsentState;

const ausWithConsent = {
	aus: { personalisedAdvertising: true },
	canTarget: true,
	framework: 'aus',
} as ConsentState;

const ausWithoutConsent = {
	aus: { personalisedAdvertising: false },
	canTarget: false,
	framework: 'aus',
} as ConsentState;

const invalidWithoutConsent = {
	canTarget: false,
	framework: null,
} as ConsentState;

const originalUA = navigator.userAgent;
const fakeUserAgent = (userAgent?: string) => {
	Object.defineProperty(navigator, 'userAgent', {
		get: () => userAgent ?? originalUA,
		configurable: true,
	});
};

describe('init', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		fakeUserAgent();
		window.guardian.config.switches = {};
	});

	it('should initialise Prebid when Prebid switch is ON and advertising is on and ad-free is off', async () => {
		expect.hasAssertions();
		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(prebid.initialise).toBeCalled();
	});

	it('should not initialise Prebid when useragent is Google Web Preview', async () => {
		expect.hasAssertions();
		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		fakeUserAgent('Google Web Preview');
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(prebid.initialise).not.toBeCalled();
	});

	it('should not initialise Prebid when no header bidding switches are on', async () => {
		expect.hasAssertions();

		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		window.guardian.config.switches = {
			prebidHeaderBidding: false,
			a9HeaderBidding: false,
		};
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(prebid.initialise).not.toBeCalled();
	});

	it('should initialise Prebid when NOT in Canada', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);
		(isInCanada as jest.Mock).mockReturnValueOnce(false);

		await setupPrebid();
		expect(prebid.initialise).toBeCalled();
	});

	it('should NOT initialise Prebid when in Canada', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);
		(isInCanada as jest.Mock).mockReturnValueOnce(true);

		await setupPrebid();
		expect(prebid.initialise).not.toBeCalled();
	});

	it('should not initialise Prebid when advertising is switched off', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = false;
		commercialFeatures.adFree = false;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(prebid.initialise).not.toBeCalled();
	});

	it('should not initialise Prebid when ad-free is on', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = true;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(prebid.initialise).not.toBeCalled();
	});

	it('should not initialise Prebid when the page has a pageskin', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		window.guardian.config.page.hasPageSkin = true;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(prebid.initialise).not.toBeCalled();
	});

	it('should initialise Prebid when the page has no pageskin', async () => {
		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		window.guardian.config.page.hasPageSkin = false;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(prebid.initialise).toBeCalled();
	});

	it('should initialise Prebid if TCFv2 consent with correct Sourcepoint Id is true ', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(tcfv2WithConsent);
		mockGetConsentFor(true);
		await setupPrebid();
		expect(prebid.initialise).toBeCalled();
	});

	it('should not initialise Prebid if TCFv2 consent with correct Sourcepoint Id is false', async () => {
		expect.assertions(2);

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(tcfv2WithoutConsent);
		mockGetConsentFor(false);

		await setupPrebid();
		expect(log).toHaveBeenCalledWith(
			'commercial',
			expect.stringContaining('Failed to execute prebid'),
			expect.stringContaining('No consent for prebid'),
		);

		expect(prebid.initialise).not.toBeCalled();
	});

	it('should initialise Prebid in CCPA if doNotSell is false', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(ccpaWithConsent);
		mockGetConsentFor(true);
		await setupPrebid();
		expect(prebid.initialise).toBeCalled();
	});

	it('should not initialise Prebid in CCPA if doNotSell is true', async () => {
		expect.assertions(2);

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(ccpaWithoutConsent);
		mockGetConsentFor(false);

		await setupPrebid();
		expect(log).toHaveBeenCalledWith(
			'commercial',
			expect.stringContaining('Failed to execute prebid'),
			expect.stringContaining('No consent for prebid'),
		);

		expect(prebid.initialise).not.toBeCalled();
	});

	it('should initialise Prebid in AUS if Advertising is not rejected', async () => {
		expect.hasAssertions();

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(ausWithConsent);
		mockGetConsentFor(true);
		await setupPrebid();
		expect(prebid.initialise).toBeCalled();
	});

	it('should not initialise Prebid in AUS if Advertising is rejected', async () => {
		expect.assertions(2);

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(ausWithoutConsent);
		mockGetConsentFor(false);

		await setupPrebid();
		expect(log).toHaveBeenCalledWith(
			'commercial',
			expect.stringContaining('Failed to execute prebid'),
			expect.stringContaining('No consent for prebid'),
		);

		expect(prebid.initialise).not.toBeCalled();
	});

	it('should not initialise Prebid if the framework is invalid', async () => {
		expect.assertions(2);

		window.guardian.config.switches = {
			prebidHeaderBidding: true,
			a9HeaderBidding: false,
		};
		commercialFeatures.dfpAdvertising = true;
		commercialFeatures.adFree = false;
		mockOnConsent(invalidWithoutConsent);
		mockGetConsentFor(true);

		await setupPrebid();
		expect(log).toHaveBeenCalledWith(
			'commercial',
			expect.stringContaining('Failed to execute prebid'),
			expect.stringContaining('Unknown framework'),
		);

		expect(prebid.initialise).not.toBeCalled();
	});
});
