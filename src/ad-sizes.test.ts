import { _, adSizes, getAdSize } from './ad-sizes';
import type { SizeKeys } from '.';

const { createAdSize } = _;

describe('ad sizes', () => {
	it.each([
		[2, 2, '2,2'],
		[100, 100, '100,100'],
		[320, 50, '320,50'],
		[970, 250, '970,250'],
		[0, 0, 'fluid'],
	])(
		'createAdSize(%d,%d) outputs string "%s"',
		(expectedWidth, expectedHeight, expectedString) => {
			const adSize = createAdSize(expectedWidth, expectedHeight);
			expect(adSize.width).toEqual(expectedWidth);
			expect(adSize.height).toEqual(expectedHeight);
			expect(adSize.length).toEqual(2);
			expect(adSize.toString()).toEqual(expectedString);
		},
	);
});

const sizes: Array<[SizeKeys, number, number, string]> = [
	['mpu', 300, 250, '300,250'],
	['fluid', 0, 0, 'fluid'],
	['googleCard', 300, 274, '300,274'],
	['outstreamGoogleDesktop', 550, 310, '550,310'],
	['300x600', 300, 600, '300,600'],
];

describe('getAdSize', () => {
	it.each(sizes)(
		'getAdSize(%s: SizeKey) outputs ad size {width: $d, height: %d}',
		(input, expectedWidth, expectedHeight, expectedString) => {
			const adSize = getAdSize(input);
			expect(adSize.width).toEqual(expectedWidth);
			expect(adSize.height).toEqual(expectedHeight);
			expect(adSize.toString()).toEqual(expectedString);
		},
	);
});

describe('get ad size array', () => {
	it('should return an array of the AdSize', () => {
		expect(adSizes.skyscraper.toArray()).toEqual([160, 600]);
		expect(adSizes.leaderboard.toArray().pop()).toEqual(90);
	});
});

describe('ad size splicing', () => {
	it('should be able to splice the array returned from the array method on AdSize', () => {
		expect(adSizes.skyscraper.toArray().splice(0, 1)[0]).toEqual(160);
		expect(adSizes.skyscraper.toArray().splice(1, 1)[0]).toEqual(600);
	});
});

describe('isProxy', () => {
	it.each([
		[160, 600],
		[300, 1050],
		[300, 197],
		[300, 250],
		[300, 600],
		[320, 50],
		[550, 310],
		[620, 350],
		[728, 90],
		[940, 230],
		[970, 250],
	])('isProxy is false for size (%d, %d)', (width, height) => {
		const adSize = createAdSize(width, height);
		expect(adSize.isProxy()).toBe(false);
	});

	it.each([
		[0, 0],
		[1, 1],
		[2, 2],
		[88, 71],
		[88, 85],
		[88, 87],
		[88, 88],
		[88, 89],
	])('isProxy is true for size (%d, %d)', (width, height) => {
		const adSize = createAdSize(width, height);
		expect(adSize.isProxy()).toBe(true);
	});
});
