import fastdom from '@guardian/frontend/static/src/javascripts/lib/fastdom-promise';
import once from 'lodash/once';
import qwery from 'qwery';
import { dfpEnv } from './dfp/dfp-env';

const shouldDisableAdSlot = (adSlot) =>
	window.getComputedStyle(adSlot).display === 'none';

const closeDisabledSlots = once(() => {
	// Get all ad slots
	let adSlots = qwery(dfpEnv.adSlotSelector);

	// remove the ones which should not be there
	adSlots = adSlots.filter(shouldDisableAdSlot);

	return fastdom.mutate(() => {
		adSlots.forEach((adSlot) => adSlot.remove());
	});
});

export { closeDisabledSlots };
