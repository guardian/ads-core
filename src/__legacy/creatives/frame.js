import fastdom from '@guardian/frontend/static/src/javascripts/lib/fastdom-promise';
import { Toggles } from '@guardian/frontend/static/src/javascripts/projects/common/modules/ui/toggles';
import { addClassesAndTitle } from 'common/views/svg';
import template from 'lodash/template';
import frameStr from 'raw-loader!commercial/views/creatives/frame.html';
import labelStr from 'raw-loader!commercial/views/creatives/gustyle-label.html';
import arrow from 'svgs/icon/arrow.svg';
import externalLink from 'svgs/icon/external-link.svg';
import { addTrackingPixel } from '../creatives/add-tracking-pixel';
import { addViewabilityTracker } from '../creatives/add-viewability-tracker';

class Frame {
	constructor(adSlot, params) {
		this.adSlot = adSlot;
		this.params = params;
	}

	create() {
		this.params.externalLinkIcon = addClassesAndTitle(externalLink.markup, [
			'frame__external-link-icon',
		]);
		this.params.target =
			this.params.newWindow === 'yes' ? '_blank' : '_self';
		this.params.id = `frame-${Math.floor(Math.random() * 10000).toString(
			16,
		)}`;

		const frameMarkup = template(frameStr)({
			data: this.params,
		});
		const labelMarkup = template(labelStr)({
			data: {
				buttonTitle: 'Ad',
				infoTitle: 'Advertising on the Guardian',
				infoText: 'is created and paid for by third parties.',
				infoLinkText:
					'Learn more about how advertising supports the Guardian.',
				infoLinkUrl:
					'https://www.theguardian.com/advertising-on-the-guardian',
				icon: addClassesAndTitle(arrow.markup, ['gu-comlabel__icon']),
				dataAttr: this.adSlot.id,
			},
		});

		return fastdom.mutate(() => {
			this.adSlot.insertAdjacentHTML('beforeend', frameMarkup);

			if (this.adSlot.lastElementChild) {
				this.adSlot.lastElementChild.insertAdjacentHTML(
					'afterbegin',
					labelMarkup,
				);
			}
			this.adSlot.classList.add('ad-slot--frame');
			if (this.params.trackingPixel) {
				addTrackingPixel(
					this.params.trackingPixel + this.params.cacheBuster,
				);
			}
			if (this.params.researchPixel) {
				addTrackingPixel(
					this.params.researchPixel + this.params.cacheBuster,
				);
			}
			if (this.params.viewabilityTracker) {
				addViewabilityTracker(
					this.adSlot,
					this.params.id,
					this.params.viewabilityTracker,
				);
			}
			const toggles = new Toggles(this.adSlot);
			toggles.init();
			return true;
		});
	}
}

export { Frame };
