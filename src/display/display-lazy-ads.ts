import { partition } from 'utils/partition';
import { dfpEnv } from '../lib/dfp/dfp-env';
import { enableLazyLoad } from './lazy-load';
import { loadAdvert } from './load-advert';

const instantLoadAdvertIds: string[] = [];

const displayLazyAds = (): void => {
	window.googletag.pubads().collapseEmptyDivs();
	window.googletag.enableServices();

	const [instantLoadAdverts, lazyLoadAdverts] = partition(
		dfpEnv.advertsToLoad,
		(advert) => instantLoadAdvertIds.includes(advert.id),
	);

	// TODO: why do we need this side effect? Can we remove?
	dfpEnv.advertsToLoad = lazyLoadAdverts;

	instantLoadAdverts.forEach(loadAdvert);
	lazyLoadAdverts.forEach(enableLazyLoad);
};

export { displayLazyAds };
