import fastdom from '../lib/fastdom-promise';

const minArticleHeight = 1300;

const getAllowedSizesForImmersive = (availableSpace: number) => {
	// filter ad slot sizes based on the available height
	// mark: 01303e88-ef1f-462d-9b6e-242419435cec
	if (availableSpace > 600) {
		return '1,1|2,2|300,250|300,274|300,600|fluid';
	} else if (availableSpace > 274) {
		return '1,1|2,2|300,250|300,274';
	} else if (availableSpace > 250) {
		return '1,1|2,2|300,250';
	}
	return '1,1|2,2';
};

const removeStickyClasses = (adSlots: Element[]) => {
	adSlots.forEach((ad) => {
		ad.classList.remove('right-sticky', 'js-sticky-mpu', 'is-sticky');
	});
};

const getTopOffset = (element: HTMLElement | undefined): number => {
	if (!element) return 0;
	const docEl = element.ownerDocument.documentElement;
	const clientRectTop = element.getBoundingClientRect().top;
	const yScroll = window.scrollY || document.documentElement.scrollTop;
	return (
		clientRectTop +
		yScroll -
		Math.max(0, docEl.clientTop, window.document.body.clientTop)
	);
};

/**
 * Initialise article aside ad slot
 * @returns Promise
 */
export const init = (): Promise<void | boolean> => {
	const col = document.querySelector<HTMLElement>('.js-secondary-column');

	// article aside ads are added server-side if the container doesn't exist then stop.
	if (!col || col.style.display === 'none') {
		return Promise.resolve(false);
	}

	const mainCol = document.querySelector<HTMLElement>(
		'.js-content-main-column',
	);
	const adSlotsWithinRightCol = Array.from(
		col.querySelectorAll<HTMLElement>('.js-ad-slot'),
	);
	const immersiveEls = Array.from(
		mainCol?.querySelectorAll<HTMLElement>('.element--immersive') ?? [],
	);

	if (!adSlotsWithinRightCol.length || !mainCol) {
		return Promise.resolve(false);
	}

	return fastdom
		.measure(() => {
			const immersiveElementOffset = getTopOffset(immersiveEls[0]);
			const mainColOffset = getTopOffset(mainCol);
			return [
				mainCol.offsetHeight,
				immersiveElementOffset - mainColOffset,
			] as const;
		})
		.then(([mainColHeight, immersiveOffset]) => {
			// we do all the adjustments server-side if the page has a ShowcaseMainElement!
			if (window.guardian.config.page.hasShowcaseMainElement) {
				return adSlotsWithinRightCol[0];
			}
			// immersive articles may have an image that overlaps the aside ad so we need to remove
			// the sticky behaviour and conditionally adjust the slot size depending on how far down
			// the page the first immersive image appears.
			if (
				window.guardian.config.page.isImmersive &&
				immersiveEls.length > 0
			) {
				return fastdom.mutate(() => {
					removeStickyClasses(adSlotsWithinRightCol);
					adSlotsWithinRightCol[0]?.setAttribute(
						'data-mobile',
						getAllowedSizesForImmersive(immersiveOffset),
					);
					return adSlotsWithinRightCol[0];
				});
			}
			// most articles are long enough to fit a DMPU. However, the occasional shorter article
			// will need the slot sizes to be adjusted, and the sticky behaviour removed.
			if (mainColHeight < minArticleHeight) {
				return fastdom.mutate(() => {
					removeStickyClasses(adSlotsWithinRightCol);
					adSlotsWithinRightCol[0]?.setAttribute(
						'data-mobile',
						'1,1|2,2|300,250|300,274|fluid',
					);
					return adSlotsWithinRightCol[0];
				});
			}
			return adSlotsWithinRightCol[0];
		})
		.then(() => {
			return true;
		});
};
