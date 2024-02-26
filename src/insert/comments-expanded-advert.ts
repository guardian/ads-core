import { log } from '@guardian/libs';
import { adSizes } from 'core/ad-sizes';
import { AD_LABEL_HEIGHT } from 'core/constants/ad-label-height';
import { createAdSlot } from 'core/create-ad-slot';
import { commercialFeatures } from 'lib/commercial-features';
import { getBreakpoint } from 'lib/detect/detect-breakpoint';
import { getViewport } from 'lib/detect/detect-viewport';
import { dfpEnv } from 'lib/dfp/dfp-env';
import { getAdvertById } from 'lib/dfp/get-advert-by-id';
import fastdom from '../utils/fastdom-promise';
import { fillDynamicAdSlot } from './fill-dynamic-advert-slot';

const tallestCommentAd = adSizes.mpu.height + AD_LABEL_HEIGHT;
const tallestCommentsExpandedAd = adSizes.halfPage.height + AD_LABEL_HEIGHT;

const insertAd = (anchor: HTMLElement) => {
	log('commercial', 'Inserting comments-expanded advert');
	const slot = createAdSlot('comments-expanded', {
		classes: 'comments-expanded',
	});

	const adSlotContainer = document.createElement('div');
	adSlotContainer.className = 'ad-slot-container';
	adSlotContainer.style.position = 'sticky';
	adSlotContainer.style.top = '0';
	adSlotContainer.appendChild(slot);

	const stickyContainer = document.createElement('div');
	stickyContainer.style.flexGrow = '1';
	stickyContainer.appendChild(adSlotContainer);

	return fastdom
		.mutate(() => {
			anchor.appendChild(adSlotContainer);
		})
		.then(() => fillDynamicAdSlot(slot, false));
};

const insertAdMobile = (anchor: HTMLElement, id: number) => {
	log('commercial', `Inserting mobile comments-expanded-${id} advert`);
	const slot = createAdSlot('comments-expanded', {
		name: `comments-expanded-${id}`,
		classes: 'comments-expanded',
	});
	slot.style.minHeight = `${adSizes.mpu.height + AD_LABEL_HEIGHT}px`;

	const adSlotContainer = document.createElement('div');
	adSlotContainer.className = 'ad-slot-container';
	adSlotContainer.style.width = '300px';
	adSlotContainer.style.margin = '20px auto';
	adSlotContainer.appendChild(slot);

	return fastdom
		.mutate(() => {
			anchor.appendChild(adSlotContainer);
		})
		.then(() => fillDynamicAdSlot(slot, false));
};

const getRightColumn = (): HTMLElement => {
	const selector = window.guardian.config.isDotcomRendering
		? '.commentsRightColumn'
		: '.js-discussion__ad-slot';
	const rightColumn: HTMLElement | null = document.querySelector(selector);

	if (!rightColumn) throw new Error('Could not find right column.');

	return rightColumn;
};

const getCommentsColumn = async (): Promise<HTMLElement> => {
	return fastdom.measure(() => {
		const commentsColumn: HTMLElement | null = document.querySelector(
			'[data-commercial-id="comments-column"]',
		);
		if (!commentsColumn) throw new Error('Comments are not expanded.');

		return commentsColumn;
	});
};

const isEnoughSpaceForAd = (rightColumnNode: HTMLElement): boolean => {
	// Only insert a second advert into the right-hand rail if there is enough space.
	// There is enough space if the right-hand rail is larger than:
	// (the largest possible heights of both adverts) + (the gap between the two adverts)
	const minHeightToPlaceAd =
		tallestCommentAd + tallestCommentsExpandedAd + window.innerHeight;

	return rightColumnNode.offsetHeight >= minHeightToPlaceAd;
};

const isEnoughCommentsForAd = (commentsColumn: HTMLElement): boolean =>
	commentsColumn.childElementCount >= 5;

const commentsExpandedAdsAlreadyExist = (): boolean => {
	const commentsExpandedAds = document.querySelectorAll(
		'.ad-slot--comments-expanded',
	);
	return commentsExpandedAds.length > 0 ? true : false;
};

const createResizeObserver = (rightColumnNode: HTMLElement) => {
	// When the comments load and are rendered, the height of the right column
	// will expand and there might be enough space to insert the ad.
	const resizeObserver = new ResizeObserver(() => {
		if (isEnoughSpaceForAd(rightColumnNode)) {
			void insertAd(rightColumnNode);

			resizeObserver.unobserve(rightColumnNode);
		}
	});

	resizeObserver.observe(rightColumnNode);
};

const removeMobileCommentsExpandedAds = (): Promise<void> => {
	const currentBreakpoint = getBreakpoint(getViewport().width);
	if (currentBreakpoint === 'mobile') {
		const commentsExpandedAds = document.querySelectorAll(
			'.ad-slot--comments-expanded',
		);
		return fastdom.mutate(() =>
			commentsExpandedAds.forEach((node) => {
				log('commercial', `Removing ad slot: ${node.id}`);
				const advert = getAdvertById(node.id);
				if (advert) {
					window.googletag.destroySlots([advert.slot]);
				}
				node.remove();
				dfpEnv.adverts.delete(node.id);
				dfpEnv.advertsToLoad = dfpEnv.advertsToLoad.filter(
					(_) => _ !== advert,
				);
			}),
		);
	}
	return Promise.resolve();
};

/**
 * Create a comments-expanded ad immediately if there is enough space for it. If not, then it
 * is possible that we are still waiting for the Discussion API to load the comments, so we
 * wait for the comments to load before checking again whether there is enough space to load an ad.
 */
const handleCommentsExpandedEvent = (): void => {
	if (!commercialFeatures.commentAdverts) {
		log(
			'commercial',
			'Adverts in comments are disabled in commercialFeatures',
		);
		return;
	}

	const rightColumnNode = getRightColumn();

	if (isEnoughSpaceForAd(rightColumnNode)) {
		void insertAd(rightColumnNode);
		return;
	}

	// Watch the right column and try to insert an ad when the comments are loaded.
	createResizeObserver(rightColumnNode);
};

const handleCommentsExpandedMobileEvent = async (): Promise<void> => {
	const commentsColumn = await getCommentsColumn();
	const currentBreakpoint = getBreakpoint(getViewport().width);

	if (
		currentBreakpoint === 'mobile' &&
		isEnoughCommentsForAd(commentsColumn) &&
		!commentsExpandedAdsAlreadyExist()
	) {
		let counter = 0;
		for (let i = 0; i < commentsColumn.childElementCount; i++) {
			if (
				commentsColumn.childNodes[i] &&
				(i - 3) % 5 === 0 &&
				i + 1 < commentsColumn.childElementCount
			) {
				counter++;
				const childElement = commentsColumn.childNodes[
					i
				] as HTMLElement;
				void insertAdMobile(childElement, counter);
			}
		}
	}
};

export const initCommentsExpandedAdverts = (): Promise<void> => {
	document.addEventListener('comments-expanded', () => {
		handleCommentsExpandedEvent();
	});

	if (window.guardian.config.switches.mobileDiscussionAds) {
		document.addEventListener('comments-state-change', () => {
			void removeMobileCommentsExpandedAds();
		});

		document.addEventListener('comments-loaded', () => {
			void handleCommentsExpandedMobileEvent();
		});
	}

	return Promise.resolve();
};
