import { EventTimer } from './EventTimer';
import {
	_,
	bypassCommercialMetricsSampling,
	initCommercialMetrics,
} from './sendCommercialMetrics';
import type { Metric, Property, TimedEvent } from './sendCommercialMetrics';

const {
	Endpoints,
	filterUndefinedProperties,
	mapEventTimerPropertiesToString,
	reset,
	roundTimeStamp,
	transformToObjectEntries,
} = _;

const PAGE_VIEW_ID = 'pv_id_1234567890';
const BROWSER_ID = 'bwid_abcdefghijklm';
const IS_NOT_DEV = false;
const IS_DEV = true;
const ADBLOCK_NOT_IN_USE = false;
const USER_IN_SAMPLING = 100 / 100;
const USER_NOT_IN_SAMPLING = -1;

const defaultMetrics = {
	page_view_id: PAGE_VIEW_ID,
	browser_id: BROWSER_ID,
	platform: 'NEXT_GEN',
	metrics: [],
	properties: [
		{
			name: 'adBlockerInUse',
			value: 'false',
		},
	],
};

const mockSendMetrics = () =>
	initCommercialMetrics({
		pageViewId: PAGE_VIEW_ID,
		browserId: BROWSER_ID,
		isDev: IS_NOT_DEV,
		adBlockerInUse: ADBLOCK_NOT_IN_USE,
		sampling: USER_IN_SAMPLING,
	});

const setVisibility = (value: 'hidden' | 'visible' = 'hidden'): void => {
	Object.defineProperty(document, 'visibilityState', {
		value,
		writable: true,
	});
};

describe('send commercial metrics code', () => {
	const sendBeacon = jest.fn().mockReturnValue(true);
	Object.defineProperty(navigator, 'sendBeacon', {
		configurable: true,
		enumerable: true,
		value: sendBeacon,
		writable: true,
	});

	const mockConsoleWarn = jest
		.spyOn(console, 'warn')
		.mockImplementation(() => false);

	it('can send commercial metrics when the page is hidden', () => {
		const metricsSent = mockSendMetrics();
		setVisibility();
		global.dispatchEvent(new Event('visibilitychange'));

		expect(metricsSent).toEqual(true);
		expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([
			[Endpoints.PROD, JSON.stringify(defaultMetrics)],
		]);
	});

	it('commercial metrics not sent when window is visible', () => {
		const metricsSent = mockSendMetrics();
		setVisibility('visible');
		global.dispatchEvent(new Event('visibilitychange'));

		expect(metricsSent).toEqual(false);
		expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([]);
	});

	describe('bypassCommercialMetricsSampling', () => {
		it('sends a beacon if bypassed asynchronously', () => {
			bypassCommercialMetricsSampling();

			setVisibility();
			global.dispatchEvent(new Event('visibilitychange'));
			expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([
				[Endpoints.PROD, JSON.stringify(defaultMetrics)],
			]);
		});
		it('expects to be initialised before calling bypassCoreWebVitalsSampling', () => {
			reset();
			bypassCommercialMetricsSampling();
			expect(mockConsoleWarn).toHaveBeenCalledWith(
				'initCommercialMetrics not yet initialised',
			);
		});
	});

	describe('handles various configurations', () => {
		beforeEach(() => {
			reset();
		});

		afterEach(() => {
			// Reset the properties of the event timer for the purposes of this test
			delete window.guardian.commercialTimer;
			void EventTimer.get();
		});

		it('should handle endpoint in dev', () => {
			const mockSendMetrics = initCommercialMetrics({
				pageViewId: PAGE_VIEW_ID,
				browserId: BROWSER_ID,
				isDev: IS_DEV,
				adBlockerInUse: ADBLOCK_NOT_IN_USE,
				sampling: USER_IN_SAMPLING,
			});
			setVisibility();
			global.dispatchEvent(new Event('visibilitychange'));

			expect(mockSendMetrics).toEqual(true);
			expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([
				[
					Endpoints.CODE,
					JSON.stringify({
						...defaultMetrics,
						properties: [
							{ name: 'isDev', value: 'localhost' },
							{ name: 'adBlockerInUse', value: 'false' },
						],
					}),
				],
			]);
		});

		it('should handle connection properties if they exist', () => {
			const sentMetrics = mockSendMetrics();
			const eventTimer = EventTimer.get();
			// Fix the properties of the event timer for the purposes of this test
			eventTimer.properties = {
				downlink: 1,
				effectiveType: '4g',
			};
			setVisibility();
			global.dispatchEvent(new Event('visibilitychange'));

			expect(sentMetrics).toEqual(true);
			expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([
				[
					Endpoints.PROD,
					JSON.stringify({
						...defaultMetrics,
						properties: [
							{ name: 'downlink', value: '1' },
							{ name: 'effectiveType', value: '4g' },
							{ name: 'adBlockerInUse', value: 'false' },
						],
					}),
				],
			]);
		});

		it('should merge properties adequately', () => {
			const eventTimer = EventTimer.get();
			// Fix the properties of the event timer for the purposes of this test
			eventTimer.properties = {
				downlink: 1,
				effectiveType: '4g',
			};
			const sentMetrics = initCommercialMetrics({
				pageViewId: PAGE_VIEW_ID,
				browserId: BROWSER_ID,
				isDev: IS_DEV,
				adBlockerInUse: ADBLOCK_NOT_IN_USE,
				sampling: USER_IN_SAMPLING,
			});
			setVisibility();
			global.dispatchEvent(new Event('pagehide'));
			expect(sentMetrics).toEqual(true);
			expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([
				[
					Endpoints.CODE,
					JSON.stringify({
						...defaultMetrics,
						properties: [
							{ name: 'downlink', value: '1' },
							{ name: 'effectiveType', value: '4g' },
							{ name: 'isDev', value: 'localhost' },
							{ name: 'adBlockerInUse', value: 'false' },
						],
					}),
				],
			]);
		});

		it('should return false if user is not in sampling', () => {
			const sentMetrics = initCommercialMetrics({
				pageViewId: PAGE_VIEW_ID,
				browserId: BROWSER_ID,
				isDev: IS_NOT_DEV,
				adBlockerInUse: ADBLOCK_NOT_IN_USE,
				sampling: USER_NOT_IN_SAMPLING,
			});
			expect(sentMetrics).toEqual(false);
		});

		it('should set sampling at 0.01 if sampling is not passed in', () => {
			const sentMetrics = initCommercialMetrics({
				pageViewId: PAGE_VIEW_ID,
				browserId: BROWSER_ID,
				isDev: IS_NOT_DEV,
				adBlockerInUse: ADBLOCK_NOT_IN_USE,
			});
			const mathRandomSpy = jest.spyOn(Math, 'random');
			mathRandomSpy.mockImplementation(() => 0.5);
			expect(sentMetrics).toEqual(false);
		});

		it('should merge properties even if adblocking is not passed in', () => {
			const eventTimer = EventTimer.get();
			eventTimer.properties = {
				downlink: 1,
				effectiveType: '4g',
			};
			const sentMetrics = initCommercialMetrics({
				pageViewId: PAGE_VIEW_ID,
				browserId: BROWSER_ID,
				isDev: IS_DEV,
				adBlockerInUse: undefined,
				sampling: USER_IN_SAMPLING,
			});
			setVisibility();
			global.dispatchEvent(new Event('pagehide'));
			expect(sentMetrics).toEqual(true);
			expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([
				[
					Endpoints.CODE,
					JSON.stringify({
						...defaultMetrics,
						properties: [
							{ name: 'downlink', value: '1' },
							{ name: 'effectiveType', value: '4g' },
							{ name: 'isDev', value: 'localhost' },
						],
					}),
				],
			]);
		});

		it('should accept ad slot properties', () => {
			const sentMetrics = initCommercialMetrics({
				pageViewId: PAGE_VIEW_ID,
				browserId: BROWSER_ID,
				isDev: IS_DEV,
			});
			setVisibility();
			const eventTimer = EventTimer.get();
			eventTimer.setProperty('adSlotsInline', 5);
			eventTimer.setProperty('adSlotsTotal', 10);
			global.dispatchEvent(new Event('pagehide'));
			expect(sentMetrics).toEqual(true);
			expect((navigator.sendBeacon as jest.Mock).mock.calls).toEqual([
				[
					Endpoints.CODE,
					JSON.stringify({
						...defaultMetrics,
						properties: [
							{ name: 'adSlotsInline', value: '5' },
							{ name: 'adSlotsTotal', value: '10' },
							{ name: 'isDev', value: 'localhost' },
						],
					}),
				],
			]);
		});
	});
});

describe('send commercial metrics helpers', () => {
	const eventProperties = {
		type: undefined,
		downlink: 1,
		effectiveType: '4g',
	};

	const transformedProperties: Array<[string, string | number | undefined]> =
		[
			['type', undefined],
			['downlink', 1],
			['effectiveType', '4g'],
		];

	const filteredProperties: Array<[string, string | number]> = [
		['downlink', 1],
		['effectiveType', '4g'],
	];
	const mappedProperties: Property[] = [
		{
			name: 'downlink',
			value: '1',
		},
		{
			name: 'effectiveType',
			value: '4g',
		},
	];
	const roundedEvent: Metric[] = [
		{
			name: 'cmp-tcfv2-init',
			value: 1519211809935,
		},
	];

	it('can transform event timer properties into object entries', () => {
		const transformed: Array<[string, string | number | undefined]> =
			transformToObjectEntries(eventProperties);
		expect(transformed).toEqual(transformedProperties);
	});

	it('can filter out event timer properties with a value that is undefined', () => {
		const filtered: Array<[string, string | number | undefined]> =
			filterUndefinedProperties(transformedProperties);
		expect(filtered).toEqual(filteredProperties);
	});

	it('can map event timer properties to the required format', () => {
		const mapped = mapEventTimerPropertiesToString(filteredProperties);
		expect(mapped).toEqual(mappedProperties);
	});

	// This one is seemingly not doing anything as the start and end values match
	it('can round up the value of timestamps', () => {
		const event: TimedEvent[] = [
			{
				name: 'cmp-tcfv2-init',
				ts: 1519211809934.234,
			},
		];
		const rounded = roundTimeStamp(event);
		expect(rounded).toEqual(roundedEvent);
	});
});
