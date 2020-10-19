import type { GetThirdPartyTag } from '../types';

const onLoad = () => {
	const handleQuerySurveyDone = (
		surveyAvailable: boolean,
		survey: { measurementId: string; },
	) => {
		if (surveyAvailable) {
			if (window && window.googletag) {
				window.googletag.cmd.push(() => {
					window.googletag.pubads().setTargeting('inizio', 't');
				});
			}
			console.log(`surveyAvailable: ${survey.measurementId}`);
		}
	};
	window._brandmetrics ||= [];
	window._brandmetrics.push({
		cmd: '_querySurvey',
		val: {
			callback: handleQuerySurveyDone,
		},
	});
};

export const inizio: GetThirdPartyTag = ({ shouldRun }) => ({
	shouldRun,
	url:
		'//cdn.brandmetrics.com/survey/script/e96d04c832084488a841a06b49b8fb2d.js',
	name: 'inizio',
	onLoad,
});
