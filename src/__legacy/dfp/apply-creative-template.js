import fastdom from '@guardian/frontend/static/src/javascripts/lib/fastdom-promise';
import reportError from '@guardian/frontend/static/src/javascripts/lib/report-error';
import { FabricExpandableVideoV2 } from '../creatives/fabric-expandable-video-v2';
import { FabricExpandingV1 } from '../creatives/fabric-expanding-v1';
import { FabricV1 } from '../creatives/fabric-v1';
import { FabricVideo } from '../creatives/fabric-video';
import { Frame } from '../creatives/frame';
import { ScrollableMpu } from '../creatives/scrollable-mpu-v2';

const creativeLookup = {
	frame: Frame,
	'fabric-v1': FabricV1,
	'fabric-expanding-v1': FabricExpandingV1,
	'fabric-expandable-video-v2': FabricExpandableVideoV2,
	'fabric-video': FabricVideo,
	'scrollable-mpu-v2': ScrollableMpu,
};

const renderCreativeTemplate = (adSlot, iFrame) => {
	const fetchCreativeConfig = () => {
		try {
			const breakoutScript = iFrame.contentDocument.body
				? iFrame.contentDocument.body.querySelector(
						'.breakout__script[type="application/json"]',
				  )
				: null;
			return breakoutScript ? breakoutScript.innerHTML : null;
		} catch (err) {
			return null;
		}
	};

	const mergeViewabilityTracker = (json) => {
		const viewabilityTrackerDiv = iFrame.contentDocument.getElementById(
			'viewabilityTracker',
		);
		const viewabilityTracker = viewabilityTrackerDiv
			? viewabilityTrackerDiv.childNodes[0].nodeValue.trim()
			: null;

		if (viewabilityTracker && json.params) {
			json.params.viewabilityTracker = viewabilityTracker;
		}

		return json;
	};

	const renderCreative = (config) =>
		new Promise((resolve) => {
			const Creative = creativeLookup[config.name];
			resolve(new Creative(adSlot, config.params, config.opts).create());
		});

	const hideIframe = () =>
		fastdom.mutate(() => {
			iFrame.style.display = 'none';
		});

	const creativeConfig = fetchCreativeConfig();

	if (creativeConfig) {
		return hideIframe()
			.then(() => JSON.parse(creativeConfig))
			.then(mergeViewabilityTracker)
			.then(renderCreative)
			.catch((err) => {
				reportError(
					Error(`Failed to get creative JSON ${err}`),
					{ feature: 'commercial' },
					false,
				);

				return Promise.resolve(true);
			});
	}

	return Promise.resolve(true);
};

const getAdvertIframe = (adSlot) =>
	new Promise((resolve, reject) => {
		// DFP will sometimes return empty iframes, denoted with a '__hidden__' parameter embedded in its ID.
		// We need to be sure only to select the ad content frame.
		const contentFrame = adSlot.querySelector(
			'iframe:not([id*="__hidden__"])',
		);

		if (!contentFrame) {
			reject();
		} else if (
			// According to Flow, readyState exists on the Document, not the HTMLIFrameElement
			// Is this different for old IE?

			contentFrame.readyState &&
			contentFrame.readyState !== 'complete'
		) {
			// On IE, wait for the frame to load before interacting with it
			const getIeIframe = (e) => {
				const updatedIFrame = e.srcElement;

				if (updatedIFrame && updatedIFrame.readyState === 'complete') {
					updatedIFrame.removeEventListener(
						'readystatechange',
						getIeIframe,
					);
					resolve(contentFrame);
				}
			};

			contentFrame.addEventListener('readystatechange', getIeIframe);
		} else {
			resolve(contentFrame);
		}
	});

/**
 * Not all adverts render themselves - some just provide data for templates that we implement in commercial.js.
 * This looks for any such data and, if we find it, renders the appropriate component.
 */
const applyCreativeTemplate = (adSlot) =>
	getAdvertIframe(adSlot).then((iframe) =>
		renderCreativeTemplate(adSlot, iframe),
	);

export { applyCreativeTemplate };
