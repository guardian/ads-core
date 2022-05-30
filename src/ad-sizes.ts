type AdSizeString = 'fluid' | `${number},${number}`;

class AdSizeClass extends Array<number> {
	readonly [0]: number;
	readonly [1]: number;

	constructor([width, height]: [number, number]) {
		super();
		this.push(width, height);
	}
	public toString(): AdSizeString {
		return this.width === 0 && this.height === 0
			? 'fluid'
			: `${this[0]},${this[1]}`;
	}

	get width(): number {
		return this[0];
	}

	get height(): number {
		return this[1];
	}
}

type AdSize = Readonly<AdSizeClass> | 'fluid';

type SizeKeys =
	| '160x600'
	| '300x1050'
	| '300x250'
	| '300x600'
	| '728x90'
	| '970x250'
	| 'billboard'
	| 'empty'
	| 'fabric'
	| 'fluid'
	| 'googleCard'
	| 'halfPage'
	| 'inlineMerchandising'
	| 'leaderboard'
	| 'merchandising'
	| 'merchandisingHigh'
	| 'merchandisingHighAdFeature'
	| 'mobilesticky'
	| 'mpu'
	| 'outOfPage'
	| 'outstreamDesktop'
	| 'outstreamGoogleDesktop'
	| 'outstreamMobile'
	| 'portrait'
	| 'skyscraper';

type SlotName =
	| 'right'
	| 'comments'
	| 'inline'
	| 'top-above-nav'
	| 'mostpop'
	| 'merchandising-high'
	| 'merchandising-high-lucky'
	| 'high-merch-paid'
	| 'merchandising'
	| 'survey'
	| 'im'
	| 'carrot'
	| 'epic'
	| 'mobile-sticky';

type PlatformSize = 'mobile' | 'desktop' | 'phablet' | 'tablet';

type SizeMapping = Partial<Record<PlatformSize, AdSize[]>>;

type SlotSizeMappings = Record<SlotName, SizeMapping>;

const createAdSize = (width: number, height: number): AdSize => {
	const size = new AdSizeClass([width, height]);
	return size.toString() === 'fluid' ? 'fluid' : size;
};

const adSizesPartial = {
	// standard ad sizes
	billboard: createAdSize(970, 250),
	halfPage: createAdSize(300, 600),
	leaderboard: createAdSize(728, 90),
	mobilesticky: createAdSize(320, 50),
	mpu: createAdSize(300, 250),
	portrait: createAdSize(300, 1050),
	skyscraper: createAdSize(160, 600),

	// dfp proprietary ad sizes
	fluid: createAdSize(0, 0),
	googleCard: createAdSize(300, 274),
	outOfPage: createAdSize(1, 1),

	// guardian proprietary ad sizes
	empty: createAdSize(2, 2),
	fabric: createAdSize(88, 71),
	inlineMerchandising: createAdSize(88, 85),
	merchandising: createAdSize(88, 88),
	merchandisingHigh: createAdSize(88, 87),
	merchandisingHighAdFeature: createAdSize(88, 89),
	outstreamDesktop: createAdSize(620, 350),
	outstreamGoogleDesktop: createAdSize(550, 310),
	outstreamMobile: createAdSize(300, 197),
};

const adSizes: Record<SizeKeys, AdSize> = {
	...adSizesPartial,
	'970x250': adSizesPartial.billboard,
	'728x90': adSizesPartial.leaderboard,
	'300x250': adSizesPartial.mpu,
	'300x600': adSizesPartial.halfPage,
	'300x1050': adSizesPartial.portrait,
	'160x600': adSizesPartial.skyscraper,
};

const slotSizeMappings: SlotSizeMappings = {
	right: {
		mobile: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.halfPage,
			adSizes.fluid,
		],
	},
	comments: {
		mobile: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.halfPage,
			adSizes.outstreamMobile,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.fluid,
		],
		desktop: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.fluid,
			adSizes.halfPage,
			adSizes.skyscraper,
		],
		phablet: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.outstreamMobile,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.fluid,
		],
	},
	'top-above-nav': {
		tablet: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.fabric,
			adSizes.fluid,
			adSizes.leaderboard,
		],
		desktop: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.leaderboard,
			createAdSize(940, 230),
			createAdSize(900, 250),
			adSizes.billboard,
			adSizes.fabric,
			adSizes.fluid,
		],
	},
	mostpop: {
		mobile: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.fluid,
		],
		tablet: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.halfPage,
			adSizes.leaderboard,
			adSizes.fluid,
		],
		phablet: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.outstreamMobile,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.halfPage,
			adSizes.fluid,
		],
		desktop: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.mpu,
			adSizes.googleCard,
			adSizes.halfPage,
			adSizes.fluid,
		],
	},
	'merchandising-high': {
		mobile: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.merchandisingHigh,
			adSizes.fluid,
		],
	},
	merchandising: {
		mobile: [
			adSizes.outOfPage,
			adSizes.empty,
			adSizes.merchandising,
			adSizes.fluid,
		],
	},
	survey: {
		desktop: [adSizes.outOfPage],
	},
};

const getAdSize = (size: SizeKeys): AdSize | 'fluid' => adSizes[size];

// Export for testing
export const _ = { createAdSize };

export type { AdSizeString, AdSize, SizeKeys, SizeMapping, SlotSizeMappings };
export { adSizes, getAdSize, slotSizeMappings, createAdSize };
