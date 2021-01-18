import $ from '@guardian/frontend/static/src/javascripts/lib/$';
import config from '@guardian/frontend/static/src/javascripts/lib/config';
import { getBreakpoint } from '@guardian/frontend/static/src/javascripts/lib/detect';
import fastdom from '@guardian/frontend/static/src/javascripts/lib/fastdom-promise';
import mediator from '@guardian/frontend/static/src/javascripts/lib/mediator';
import { commercialFeatures } from '@guardian/frontend/static/src/javascripts/projects/common/modules/commercial/commercial-features';
import { isUserLoggedIn } from '@guardian/frontend/static/src/javascripts/projects/common/modules/identity/api';
import { adSizes } from './ad-sizes';
import { addSlot } from './dfp/add-slot';
import { createSlots } from './dfp/create-slots';
import { getAdvertById } from './dfp/get-advert-by-id';
import { refreshAdvert } from './dfp/load-advert';

const createCommentSlots = (canBeDmpu) => {
	const sizes = canBeDmpu
		? { desktop: [adSizes.halfPage, adSizes.skyscraper] }
		: {};
	const adSlots = createSlots('comments', { sizes });

	adSlots.forEach((adSlot) => {
		adSlot.classList.add('js-sticky-mpu');
	});
	return adSlots;
};

const insertCommentAd = ($commentMainColumn, $adSlotContainer, canBeDmpu) => {
	const commentSlots = createCommentSlots(canBeDmpu);

	return (
		fastdom
			.mutate(() => {
				$commentMainColumn.addClass('discussion__ad-wrapper');
				if (
					!config.get('page.isLiveBlog') &&
					!config.get('page.isMinuteArticle')
				) {
					$commentMainColumn.addClass('discussion__ad-wrapper-wider');
				}
				// Append each slot into the adslot container...
				commentSlots.forEach((adSlot) => {
					$adSlotContainer.append(adSlot);
				});
				return commentSlots[0];
			})
			// Add only the fist slot (DFP slot) to GTP
			.then((adSlot) => {
				addSlot(adSlot, false);
				Promise.resolve(mediator.emit('page:commercial:comments'));
			})
	);
};

const containsDMPU = (ad) =>
	ad.sizes.desktop.some(
		((el) => el[0] === 300 && el[1] === 600) ||
			((el) => el[0] === 160 && el[1] === 600),
	);

const maybeUpgradeSlot = (ad, $adSlot) => {
	if (!containsDMPU(ad)) {
		ad.sizes.desktop.push([300, 600], [160, 600]);
		ad.slot.defineSizeMapping([[[0, 0], ad.sizes.desktop]]);
		fastdom.mutate(() => {
			$adSlot[0].setAttribute(
				'data-desktop',
				'1,1|2,2|300,250|300,274|fluid|300,600|160,600',
			);
		});
	}
	return ad;
};

const runSecondStage = ($commentMainColumn, $adSlotContainer) => {
	const $adSlot = $('.js-ad-slot', $adSlotContainer);
	const commentAdvert = getAdvertById('dfp-ad--comments');

	if (commentAdvert && $adSlot.length) {
		// when we refresh the slot, the sticky behavior runs again
		// this means the sticky-scroll height is corrected!
		refreshAdvert(maybeUpgradeSlot(commentAdvert, $adSlot));
	}

	if (!commentAdvert) {
		insertCommentAd($commentMainColumn, $adSlotContainer, true);
	}
};

export const initCommentAdverts = () => {
	const $adSlotContainer = $('.js-discussion__ad-slot');
	const isMobile = getBreakpoint() === 'mobile';
	if (
		!commercialFeatures.commentAdverts ||
		!$adSlotContainer.length ||
		isMobile
	) {
		return Promise.resolve(false);
	}

	mediator.once('modules:comments:renderComments:rendered', () => {
		const isLoggedIn = isUserLoggedIn();
		const $commentMainColumn = $('.js-comments .content__main-column');

		fastdom
			.measure(() => $commentMainColumn.dim().height)
			.then((mainColHeight) => {
				// always insert an MPU/DMPU if the user is logged in, since the
				// containers are reordered, and comments are further from most-pop
				if (
					mainColHeight >= 800 ||
					(isLoggedIn && mainColHeight >= 600)
				) {
					insertCommentAd($commentMainColumn, $adSlotContainer, true);
				} else if (isLoggedIn) {
					insertCommentAd(
						$commentMainColumn,
						$adSlotContainer,
						false,
					);
				}
				mediator.on('discussion:comments:get-more-replies', () => {
					runSecondStage($commentMainColumn, $adSlotContainer);
				});
			});
	});
	return Promise.resolve(true);
};

export const _ = {
	maybeUpgradeSlot,
	createCommentSlots,
	insertCommentAd,
	runSecondStage,
	containsDMPU,
};
