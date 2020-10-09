export type TagAtrribute = {
	name: string;
	value: string;
};

export type GetThirdPartyTag = (arg0: { shouldRun: boolean }) => ThirdPartyTag;

export type ThirdPartyTag = {
	async?: boolean;
	attrs?: Array<TagAtrribute>;
	beforeLoad?: () => void;
	insertSnippet?: () => void;
	loaded?: boolean;
	onLoad?: () => void;
	shouldRun: boolean;
	name?: string;
	url?: string;
	useImage?: boolean;
};

export type GoogleTagParams = unknown;
export type GoogleTrackConversionObject = {
	google_conversion_id: number;
	google_custom_params: GoogleTagParams;
	google_remarketing_only: boolean;
};

declare global {
	interface Window {
		google_trackConversion: (arg0: GoogleTrackConversionObject) => void;
		google_tag_params: GoogleTagParams;
		_brandmetrics?: { cmd: string; val: Record<string, unknown> }[];
		// eslint-disable-next-line no-undef
		googletag: googletag.Googletag;
	}
}
