import { log } from '@guardian/libs';
import type { ConnectionType } from './types';

const supportsPerformanceAPI = () =>
	typeof window !== 'undefined' &&
	typeof window.performance !== 'undefined' &&
	typeof window.performance.mark === 'function';

interface EventTimerProperties {
	type?: ConnectionType;
	downlink?: number;
	effectiveType?: string;
	adSlotsInline?: number;
	adSlotsTotal?: number;
	// the height of the page / the viewport height
	pageHeightVH?: number;
	gpcSignal?: number;
	// distance in percentage of viewport height at which ads are lazy loaded
	lazyLoadMarginPercent?: number;
	hasLabsContainer?: boolean;
	labsUrl?: string;
}

// Events will be logged using the performance API for all slots, but only these slots will be tracked as commercial metrics
const trackedSlots = ['top-above-nav', 'inline1', 'inline2'] as const;

type TrackedSlot = (typeof trackedSlots)[number];

// marks that we want to save as commercial metrics
const slotMarks = ['slotReady', 'adRenderStart', 'adOnPage'] as const;

type SlotMark = (typeof slotMarks)[number];

// measures that we want to save as commercial metrics
const slotMeasures = [
	'adRender',
	'defineSlot',
	'prepareSlot',
	'prebid',
	'fetchAd',
] as const;

type SlotMeasure = (typeof slotMeasures)[number];

const pageMarks = ['commercialStart', 'commercialModulesLoaded'] as const;

type PageMark = (typeof pageMarks)[number];

// measures that we want to save as commercial metrics
const pageMeasures = ['commercialBoot', 'googletagInit'] as const;

type PageMeasure = (typeof pageMeasures)[number];

// all marks, including the measure start and end marks
const allSlotMarks = [
	...slotMarks,
	...slotMeasures.map((measure) => `${measure}Start`),
	...slotMeasures.map((measure) => `${measure}End`),
] as const;

enum ExternalEvents {
	CmpInit = 'cmp-init',
	CmpUiDisplayed = 'cmp-ui-displayed',
	CmpGotConsent = 'cmp-got-consent',
}

const shouldSaveMark = (eventName: string): boolean => {
	let [origin, eventType] = eventName.split('_') as [
		string,
		string | undefined,
	];
	if (!eventType) {
		eventType = origin;
		origin = 'page';
	}

	return (
		(trackedSlots.includes(origin as TrackedSlot) &&
			slotMarks.includes(eventType as SlotMark)) ||
		(origin === 'page' && pageMarks.includes(eventType as PageMark))
	);
};

// measures that we want to save as commercial metrics, ones related to slots and googletagInitDuration
const shouldSaveMeasure = (measureName: string) => {
	let [origin, measureType] = measureName.split('_');
	if (!measureType) {
		measureType = origin;
		origin = 'page';
	}

	return (
		(trackedSlots.includes(origin as TrackedSlot) &&
			slotMeasures.includes(measureType as SlotMeasure)) ||
		(origin === 'page' && pageMeasures.includes(measureType as PageMeasure))
	);
};

class EventTimer {
	private _events: Map<string, PerformanceEntry>;

	private _measures: Map<string, PerformanceMeasure>;

	properties: EventTimerProperties;
	/**
	 * Initialise the EventTimer class on page.
	 * Returns the singleton instance of the EventTimer class and binds
	 * to window.guardian.commercialTimer. If it's been previously
	 * initialised and bound it returns the original instance
	 * Note: We save to window.guardian.commercialTimer because
	 * different bundles (DCR / DCP) can use commercial core, and we want
	 * all timer events saved to a single instance per-page
	 * @returns {EventTimer} Instance of EventTimer
	 */
	static init(): EventTimer {
		return (window.guardian.commercialTimer ||= new EventTimer());
	}

	/**
	 * Just a helper method to access the singleton instance of EventTimer.
	 * Typical use case is EventTimer.get().trigger
	 */
	static get(): EventTimer {
		return this.init();
	}

	/**
	 * External events are events that are not triggered by the commercial but we are interested in
	 * tracking their performance. For example, CMP-related events.
	 **/
	get externalEvents(): Map<ExternalEvents, PerformanceEntry> {
		if (!supportsPerformanceAPI()) {
			return new Map();
		}

		return Object.values(ExternalEvents).reduce((map, event) => {
			const entries = window.performance.getEntriesByName(event);
			if (entries.length) {
				map.set(event, entries[0]);
			}
			return map;
		}, new Map<ExternalEvents, PerformanceEntry>());
	}

	/**
	 * Returns all performance marks and measures that should be saved as commercial metrics.
	 */
	public get events() {
		return [...this._events, ...this.externalEvents].map(
			([name, timer]) => ({
				name,
				ts: timer.startTime,
			}),
		);
	}

	/**
	 * Returns all performance measures that should be saved as commercial metrics.
	 */
	public get measures() {
		return [...this._measures].map(([name, measure]) => ({
			name,
			duration: measure.duration,
		}));
	}

	private constructor() {
		this._events = new Map();
		this._measures = new Map();

		this.properties = {};

		if (window.navigator.connection) {
			this.properties.type = window.navigator.connection.type;
			this.properties.downlink = window.navigator.connection.downlink;
			this.properties.effectiveType =
				window.navigator.connection.effectiveType;
		}
	}

	/**
	 * Adds a non timer measurement
	 *
	 * @param {string} name - the property's name
	 * @param value - the property's value
	 */
	setProperty<T extends keyof EventTimerProperties>(
		name: T,
		value: EventTimerProperties[T],
	): void {
		this.properties[name] = value;
	}

	/**
	 * Creates a new performance mark
	 * For slot events also ensures each TYPE of event event is only logged once per slot
	 *
	 * TODO more strict typing for eventName and origin
	 *
	 * @param eventName The short name applied to the mark
	 * @param origin - Either 'page' (default) or the name of the slot
	 */
	trigger(eventName: string, origin = 'page'): void {
		let name = eventName;
		if (allSlotMarks.includes(eventName) && origin !== 'page') {
			name = `${origin}_${name}`;
		}

		if (this._events.get(name) || !supportsPerformanceAPI()) {
			return;
		}

		const mark = window.performance.mark(name);

		if (
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- browser support is patchy
			typeof mark?.startTime === 'number' &&
			// we only want to save the marks that are related to certain slots or the page
			shouldSaveMark(name)
		) {
			this._events.set(name, mark);
		}

		if (name.endsWith('End')) {
			this.measure(name);
		}
	}

	private measure(endEvent: string): void {
		const startEvent = endEvent.replace('End', 'Start');
		const measureName = endEvent.replace('End', '');
		const startMarkExists =
			window.performance.getEntriesByName(startEvent).length > 0;
		if (startMarkExists) {
			try {
				const measure = window.performance.measure(
					measureName,
					startEvent,
					endEvent,
				);

				// we only want to save the measures that are related to certain slots or the page
				if (shouldSaveMeasure(measureName)) {
					this._measures.set(measureName, measure);
				}
			} catch (e) {
				log('commercial', `error measuring ${measureName}`, e);
			}
		}
	}
}

const _ = {
	slotMarks,
	slotMeasures,
	trackedSlots,
};

export { EventTimer, _ };
