import { createAdSlot, wrapSlotInContainer } from 'core/create-ad-slot';
import fastdom from '../../lib/fastdom-promise';

const insertCrosswordsAd = (anchor: HTMLElement) => {
	const testSlot = createAdSlot('mobile-sticky');

	const testContainer = wrapSlotInContainer(testSlot, {
		className:
			'fc-container fc-container--commercial dfp-ad--mobile-sticky ad-slot-container--centre-slot mobile-banner',
	});

	testContainer.style.display = 'flex';
	testContainer.style.justifyContent = 'center';
	void fastdom.mutate(() => {
		if (anchor.parentNode) {
			anchor.parentNode.insertBefore(testContainer, anchor);
		}
	});
};

export const init = (): Promise<void> => {
	if (
		window.guardian.config.isDotcomRendering ||
		!!window.guardian.config.switches.crosswordsMobileSticky
	) {
		return Promise.resolve();
	}

	const anchorSelector = window.guardian.config.page.commentable
		? '.crossword__container__below-controls + *'
		: '.content-footer > :first-child';

	const anchor: HTMLElement | null = document.querySelector(anchorSelector);

	if (anchor) {
		insertCrosswordsAd(anchor);
	} else {
		window.addEventListener('crossword-loaded', () => {
			const anchor: HTMLElement | null =
				document.querySelector(anchorSelector);
			if (anchor) {
				insertCrosswordsAd(anchor);
			} else return;
		});
	}

	return Promise.resolve();
};
