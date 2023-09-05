import { getStage, getTestUrl } from '../../lib/util';
import type { Page } from './Page';

const stage = getStage();

const articles: Page[] = [
	{
		path: getTestUrl(
			stage,
			'/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
		),
	},
	{
		path: getTestUrl(
			stage,
			'/sport/2022/feb/10/team-gb-winter-olympic-struggles-go-on-with-problems-for-skeleton-crew',
		),
	},
	{
		path: getTestUrl(
			stage,
			'/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife',
		),
		expectedMinInlineSlotsOnDesktop: 11,
		expectedMinInlineSlotsOnMobile: 16,
	},
	{
		path: getTestUrl(
			stage,
			'/society/2020/aug/13/disabled-wont-receive-critical-care-covid-terrifying',
		),
		name: 'sensitive-content',
	},
	{
		path: getTestUrl(
			stage,
			'/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
			'article',
			'comdev',
		),
	},
];

const Standard = {
	slotMachineFlags: '',
	main: '<figure class="element element-image" data-media-id="ca1ab65e57b67491418deb6430ed72d2c5ce6fdd"> <img src="https://media.guim.co.uk/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/1000.jpg" alt="Jeremy Corbyn at a Stop the War coalition protest in August 2021." width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">Jeremy Corbyn at a Stop the War coalition protest in August 2021.</span> <span class="element-image__credit">Photograph: Neil Hall/EPA</span> </figcaption> </figure>',
	subMetaSectionLinks: [
		{ url: '/politics/keir-starmer', title: 'Keir Starmer' },
	],
	commercialProperties: {
		US: {
			adTargeting: [
				{
					name: 'url',
					value: '/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
				},
				{ name: 'su', value: ['0'] },
				{ name: 'edition', value: 'us' },
				{ name: 'ct', value: 'article' },
				{ name: 'tn', value: ['news'] },
				{
					name: 'k',
					value: [
						'jeremy-corbyn',
						'politics',
						'europe-news',
						'russia',
						'ukraine',
						'keir-starmer',
						'labour',
						'uk/uk',
						'nato',
						'stop-the-war-coalition',
						'foreignpolicy',
					],
				},
				{ name: 'co', value: ['heatherstewart'] },
				{ name: 'sh', value: 'https://www.theguardian.com/p/kjnz8' },
				{ name: 'p', value: 'ng' },
			],
		},
		AU: {
			adTargeting: [
				{
					name: 'url',
					value: '/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
				},
				{ name: 'su', value: ['0'] },
				{ name: 'edition', value: 'au' },
				{ name: 'ct', value: 'article' },
				{ name: 'tn', value: ['news'] },
				{
					name: 'k',
					value: [
						'jeremy-corbyn',
						'politics',
						'europe-news',
						'russia',
						'ukraine',
						'keir-starmer',
						'labour',
						'uk/uk',
						'nato',
						'stop-the-war-coalition',
						'foreignpolicy',
					],
				},
				{ name: 'co', value: ['heatherstewart'] },
				{ name: 'sh', value: 'https://www.theguardian.com/p/kjnz8' },
				{ name: 'p', value: 'ng' },
			],
		},
		UK: {
			adTargeting: [
				{
					name: 'url',
					value: '/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
				},
				{ name: 'su', value: ['0'] },
				{ name: 'edition', value: 'uk' },
				{ name: 'ct', value: 'article' },
				{ name: 'tn', value: ['news'] },
				{
					name: 'k',
					value: [
						'jeremy-corbyn',
						'politics',
						'europe-news',
						'russia',
						'ukraine',
						'keir-starmer',
						'labour',
						'uk/uk',
						'nato',
						'stop-the-war-coalition',
						'foreignpolicy',
					],
				},
				{ name: 'co', value: ['heatherstewart'] },
				{ name: 'sh', value: 'https://www.theguardian.com/p/kjnz8' },
				{ name: 'p', value: 'ng' },
			],
		},
		INT: {
			adTargeting: [
				{
					name: 'url',
					value: '/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
				},
				{ name: 'su', value: ['0'] },
				{ name: 'ct', value: 'article' },
				{ name: 'tn', value: ['news'] },
				{
					name: 'k',
					value: [
						'jeremy-corbyn',
						'politics',
						'europe-news',
						'russia',
						'ukraine',
						'keir-starmer',
						'labour',
						'uk/uk',
						'nato',
						'stop-the-war-coalition',
						'foreignpolicy',
					],
				},
				{ name: 'co', value: ['heatherstewart'] },
				{ name: 'p', value: 'ng' },
				{ name: 'edition', value: 'int' },
				{ name: 'sh', value: 'https://www.theguardian.com/p/kjnz8' },
			],
		},
		EUR: {
			adTargeting: [
				{
					name: 'url',
					value: '/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
				},
				{ name: 'su', value: ['0'] },
				{ name: 'ct', value: 'article' },
				{ name: 'tn', value: ['news'] },
				{ name: 'co', value: ['heatherstewart'] },
				{ name: 'sh', value: 'https://www.theguardian.com/p/kjnz8' },
				{ name: 'p', value: 'ng' },
				{
					name: 'k',
					value: [
						'jeremy-corbyn',
						'politics',
						'europe-news',
						'russia',
						'ukraine',
						'keir-starmer',
						'labour',
						'uk/uk',
						'nato',
						'stop-the-war-coalition',
						'foreignpolicy',
					],
				},
				{ name: 'edition', value: 'eur' },
			],
		},
	},
	beaconURL: '//phar.gu-web.net',
	hasRelated: true,
	webPublicationSecondaryDateDisplay:
		'First published on Thu 10 Feb 2022 16.31 GMT',
	editionLongForm: 'UK edition',
	publication: 'The Guardian',
	trailText:
		'<strong>Exclusive:</strong> Labour leader affirms support for transatlantic alliance and attacks organisation in which Jeremy Corbyn is leading figure',
	subMetaKeywordLinks: [
		{ url: '/politics/jeremy-corbyn', title: 'Jeremy Corbyn' },
		{ url: '/politics/labour', title: 'Labour' },
		{ url: '/world/nato', title: 'Nato' },
		{ url: '/world/ukraine', title: 'Ukraine' },
		{ url: '/politics/foreignpolicy', title: 'Foreign policy' },
		{
			url: '/politics/stop-the-war-coalition',
			title: 'Stop the War coalition',
		},
		{ url: '/tone/news', title: 'news' },
	],
	contentType: 'Article',
	isRightToLeftLang: false,
	nav: {
		currentUrl: '/world/europe-news',
		pillars: [
			{
				title: 'News',
				url: '/',
				longTitle: 'Headlines',
				iconName: 'home',
				children: [
					{
						title: 'UK',
						url: '/uk-news',
						longTitle: 'UK news',
						children: [
							{ title: 'UK politics', url: '/politics' },
							{
								title: 'Education',
								url: '/education',
								children: [
									{
										title: 'Schools',
										url: '/education/schools',
									},
									{
										title: 'Teachers',
										url: '/teacher-network',
									},
									{
										title: 'Universities',
										url: '/education/universities',
									},
									{
										title: 'Students',
										url: '/education/students',
									},
								],
							},
							{ title: 'Media', url: '/media' },
							{ title: 'Society', url: '/society' },
							{ title: 'Law', url: '/law' },
							{ title: 'Scotland', url: '/uk/scotland' },
							{ title: 'Wales', url: '/uk/wales' },
							{
								title: 'Northern Ireland',
								url: '/uk/northernireland',
							},
						],
					},
					{
						title: 'World',
						url: '/world',
						longTitle: 'World news',
						children: [
							{ title: 'Europe', url: '/world/europe-news' },
							{
								title: 'US',
								url: '/us-news',
								longTitle: 'US news',
							},
							{ title: 'Americas', url: '/world/americas' },
							{ title: 'Asia', url: '/world/asia' },
							{
								title: 'Australia',
								url: '/australia-news',
								longTitle: 'Australia news',
							},
							{ title: 'Middle East', url: '/world/middleeast' },
							{ title: 'Africa', url: '/world/africa' },
							{ title: 'Inequality', url: '/inequality' },
							{
								title: 'Global development',
								url: '/global-development',
							},
						],
					},
					{
						title: 'Climate crisis',
						url: '/environment/climate-crisis',
					},
					{ title: 'Newsletters', url: '/email-newsletters' },
					{
						title: 'Football',
						url: '/football',
						children: [
							{
								title: 'Live scores',
								url: '/football/live',
								longTitle: 'football/live',
							},
							{
								title: 'Tables',
								url: '/football/tables',
								longTitle: 'football/tables',
							},
							{
								title: 'Fixtures',
								url: '/football/fixtures',
								longTitle: 'football/fixtures',
							},
							{
								title: 'Results',
								url: '/football/results',
								longTitle: 'football/results',
							},
							{
								title: 'Competitions',
								url: '/football/competitions',
								longTitle: 'football/competitions',
							},
							{
								title: 'Clubs',
								url: '/football/teams',
								longTitle: 'football/teams',
							},
						],
					},
					{
						title: 'Business',
						url: '/business',
						children: [
							{ title: 'Economics', url: '/business/economics' },
							{ title: 'Banking', url: '/business/banking' },
							{
								title: 'Money',
								url: '/money',
								children: [
									{
										title: 'Property',
										url: '/money/property',
									},
									{
										title: 'Pensions',
										url: '/money/pensions',
									},
									{ title: 'Savings', url: '/money/savings' },
									{ title: 'Borrowing', url: '/money/debt' },
									{
										title: 'Careers',
										url: '/money/work-and-careers',
									},
								],
							},
							{
								title: 'Markets',
								url: '/business/stock-markets',
							},
							{
								title: 'Project Syndicate',
								url: '/business/series/project-syndicate-economists',
							},
							{ title: 'B2B', url: '/business-to-business' },
							{ title: 'Retail', url: '/business/retail' },
						],
					},
					{
						title: 'Environment',
						url: '/environment',
						children: [
							{
								title: 'Climate crisis',
								url: '/environment/climate-crisis',
							},
							{ title: 'Wildlife', url: '/environment/wildlife' },
							{ title: 'Energy', url: '/environment/energy' },
							{
								title: 'Pollution',
								url: '/environment/pollution',
							},
						],
					},
					{ title: 'UK politics', url: '/politics' },
					{
						title: 'Education',
						url: '/education',
						children: [
							{ title: 'Schools', url: '/education/schools' },
							{ title: 'Teachers', url: '/teacher-network' },
							{
								title: 'Universities',
								url: '/education/universities',
							},
							{ title: 'Students', url: '/education/students' },
						],
					},
					{ title: 'Society', url: '/society' },
					{ title: 'Science', url: '/science' },
					{ title: 'Tech', url: '/technology' },
					{ title: 'Global development', url: '/global-development' },
					{ title: 'Obituaries', url: '/obituaries' },
				],
			},
			{
				title: 'Opinion',
				url: '/commentisfree',
				longTitle: 'Opinion home',
				iconName: 'home',
				children: [
					{ title: 'The Guardian view', url: '/profile/editorial' },
					{ title: 'Columnists', url: '/index/contributors' },
					{ title: 'Cartoons', url: '/cartoons/archive' },
					{
						title: 'Opinion videos',
						url: '/type/video+tone/comment',
					},
					{ title: 'Letters', url: '/tone/letters' },
				],
			},
			{
				title: 'Sport',
				url: '/sport',
				longTitle: 'Sport home',
				iconName: 'home',
				children: [
					{
						title: 'Football',
						url: '/football',
						children: [
							{
								title: 'Live scores',
								url: '/football/live',
								longTitle: 'football/live',
							},
							{
								title: 'Tables',
								url: '/football/tables',
								longTitle: 'football/tables',
							},
							{
								title: 'Fixtures',
								url: '/football/fixtures',
								longTitle: 'football/fixtures',
							},
							{
								title: 'Results',
								url: '/football/results',
								longTitle: 'football/results',
							},
							{
								title: 'Competitions',
								url: '/football/competitions',
								longTitle: 'football/competitions',
							},
							{
								title: 'Clubs',
								url: '/football/teams',
								longTitle: 'football/teams',
							},
						],
					},
					{ title: 'Cricket', url: '/sport/cricket' },
					{ title: 'Rugby union', url: '/sport/rugby-union' },
					{ title: 'Tennis', url: '/sport/tennis' },
					{ title: 'Cycling', url: '/sport/cycling' },
					{ title: 'F1', url: '/sport/formulaone' },
					{ title: 'Golf', url: '/sport/golf' },
					{ title: 'Boxing', url: '/sport/boxing' },
					{ title: 'Rugby league', url: '/sport/rugbyleague' },
					{ title: 'Racing', url: '/sport/horse-racing' },
					{ title: 'US sports', url: '/sport/us-sport' },
				],
			},
			{
				title: 'Culture',
				url: '/culture',
				longTitle: 'Culture home',
				iconName: 'home',
				children: [
					{ title: 'Film', url: '/film' },
					{ title: 'Music', url: '/music' },
					{ title: 'TV & radio', url: '/tv-and-radio' },
					{ title: 'Books', url: '/books' },
					{ title: 'Art & design', url: '/artanddesign' },
					{ title: 'Stage', url: '/stage' },
					{ title: 'Games', url: '/games' },
					{
						title: 'Classical',
						url: '/music/classicalmusicandopera',
					},
				],
			},
			{
				title: 'Lifestyle',
				url: '/lifeandstyle',
				longTitle: 'Lifestyle home',
				iconName: 'home',
				children: [
					{ title: 'Fashion', url: '/fashion' },
					{ title: 'Food', url: '/food' },
					{ title: 'Recipes', url: '/tone/recipes' },
					{
						title: 'Travel',
						url: '/travel',
						children: [
							{ title: 'UK', url: '/travel/uk' },
							{ title: 'Europe', url: '/travel/europe' },
							{ title: 'US', url: '/travel/usa' },
						],
					},
					{
						title: 'Health & fitness',
						url: '/lifeandstyle/health-and-wellbeing',
					},
					{ title: 'Women', url: '/lifeandstyle/women' },
					{ title: 'Men', url: '/lifeandstyle/men' },
					{ title: 'Love & sex', url: '/lifeandstyle/love-and-sex' },
					{ title: 'Beauty', url: '/fashion/beauty' },
					{
						title: 'Home & garden',
						url: '/lifeandstyle/home-and-garden',
					},
					{
						title: 'Money',
						url: '/money',
						children: [
							{ title: 'Property', url: '/money/property' },
							{ title: 'Pensions', url: '/money/pensions' },
							{ title: 'Savings', url: '/money/savings' },
							{ title: 'Borrowing', url: '/money/debt' },
							{
								title: 'Careers',
								url: '/money/work-and-careers',
							},
						],
					},
					{ title: 'Cars', url: '/technology/motoring' },
				],
			},
		],
		otherLinks: [
			{
				title: 'The Guardian app',
				url: 'https://www.theguardian.com/mobile/2014/may/29/the-guardian-for-mobile-and-tablet',
			},
			{ title: 'Video', url: '/video' },
			{ title: 'Podcasts', url: '/podcasts' },
			{ title: 'Pictures', url: '/inpictures' },
			{ title: 'Newsletters', url: '/email-newsletters' },
			{
				title: "Today's paper",
				url: '/theguardian',
				children: [
					{ title: 'Obituaries', url: '/obituaries' },
					{ title: 'G2', url: '/theguardian/g2' },
					{ title: 'Journal', url: '/theguardian/journal' },
					{ title: 'Saturday', url: '/theguardian/saturday' },
				],
			},
			{
				title: 'Inside the Guardian',
				url: 'https://www.theguardian.com/membership',
			},
			{
				title: 'The Observer',
				url: '/observer',
				children: [
					{ title: 'Comment', url: '/theobserver/news/comment' },
					{ title: 'The New Review', url: '/theobserver/new-review' },
					{
						title: 'Observer Magazine',
						url: '/theobserver/magazine',
					},
					{
						title: 'Observer Food Monthly',
						url: '/theobserver/foodmonthly',
					},
				],
			},
			{
				title: 'Guardian Weekly',
				url: 'https://www.theguardian.com/weekly?INTCMP=gdnwb_mawns_editorial_gweekly_GW_TopNav_UK',
			},
			{
				title: 'Crosswords',
				url: '/crosswords',
				children: [
					{ title: 'Blog', url: '/crosswords/crossword-blog' },
					{ title: 'Quick', url: '/crosswords/series/quick' },
					{ title: 'Cryptic', url: '/crosswords/series/cryptic' },
					{ title: 'Prize', url: '/crosswords/series/prize' },
					{
						title: 'Weekend',
						url: '/crosswords/series/weekend-crossword',
					},
					{ title: 'Quiptic', url: '/crosswords/series/quiptic' },
					{ title: 'Genius', url: '/crosswords/series/genius' },
					{ title: 'Speedy', url: '/crosswords/series/speedy' },
					{ title: 'Everyman', url: '/crosswords/series/everyman' },
					{ title: 'Azed', url: '/crosswords/series/azed' },
				],
			},
			{ title: 'Wordiply', url: 'https://www.wordiply.com' },
			{
				title: 'Corrections',
				url: '/theguardian/series/corrections-and-clarifications',
			},
		],
		brandExtensions: [
			{ title: 'Search jobs', url: 'https://jobs.theguardian.com' },
			{
				title: 'Hire with Guardian Jobs',
				url: 'https://recruiters.theguardian.com/?utm_source=gdnwb&utm_medium=navbar&utm_campaign=Guardian_Navbar_Recruiters&CMP_TU=trdmkt&CMP_BUNIT=jobs',
			},
			{
				title: 'Holidays',
				url: 'https://holidays.theguardian.com?INTCMP=holidays_uk_web_newheader',
			},
			{
				title: 'Live events',
				url: 'https://membership.theguardian.com/events?INTCMP=live_uk_header_dropdown',
			},
			{ title: 'Masterclasses', url: '/guardian-masterclasses' },
			{
				title: 'Digital Archive',
				url: 'https://theguardian.newspapers.com',
			},
			{
				title: 'Guardian Print Shop',
				url: '/artanddesign/series/gnm-print-sales',
			},
			{
				title: 'Patrons',
				url: 'https://patrons.theguardian.com/?INTCMP=header_patrons',
			},
			{
				title: 'Guardian Puzzles app',
				url: 'https://puzzles.theguardian.com/download',
			},
			{
				title: 'Guardian Licensing',
				url: 'https://licensing.theguardian.com/',
			},
		],
		currentNavLinkTitle: 'Europe',
		currentPillarTitle: 'News',
		subNavSections: {
			parent: {
				title: 'World',
				url: '/world',
				longTitle: 'World news',
				children: [
					{ title: 'Europe', url: '/world/europe-news' },
					{ title: 'US', url: '/us-news', longTitle: 'US news' },
					{ title: 'Americas', url: '/world/americas' },
					{ title: 'Asia', url: '/world/asia' },
					{
						title: 'Australia',
						url: '/australia-news',
						longTitle: 'Australia news',
					},
					{ title: 'Middle East', url: '/world/middleeast' },
					{ title: 'Africa', url: '/world/africa' },
					{ title: 'Inequality', url: '/inequality' },
					{ title: 'Global development', url: '/global-development' },
				],
			},
			links: [
				{ title: 'Europe', url: '/world/europe-news' },
				{ title: 'US', url: '/us-news', longTitle: 'US news' },
				{ title: 'Americas', url: '/world/americas' },
				{ title: 'Asia', url: '/world/asia' },
				{
					title: 'Australia',
					url: '/australia-news',
					longTitle: 'Australia news',
				},
				{ title: 'Middle East', url: '/world/middleeast' },
				{ title: 'Africa', url: '/world/africa' },
				{ title: 'Inequality', url: '/inequality' },
				{ title: 'Global development', url: '/global-development' },
			],
		},
		readerRevenueLinks: {
			header: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_contribute%22%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_subscribe%22%7D',
				support:
					'https://support.theguardian.com?INTCMP=header_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support%22%7D',
				supporter:
					'https://support.theguardian.com/subscribe?INTCMP=header_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_supporter_cta%22%7D',
			},
			footer: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=footer_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support_contribute%22%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=footer_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support_subscribe%22%7D',
				support:
					'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support%22%7D',
				supporter:
					'https://support.theguardian.com/subscribe?INTCMP=footer_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_supporter_cta%22%7D',
			},
			sideMenu: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=side_menu_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support_contribute%22%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=side_menu_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support_subscribe%22%7D',
				support:
					'https://support.theguardian.com?INTCMP=side_menu_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22side_menu_support%22%7D',
				supporter:
					'https://support.theguardian.com/subscribe?INTCMP=mobilenav_print_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22mobilenav_print_cta%22%7D',
			},
			ampHeader: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=header_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_contribute%22%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_support_subscribe%22%7D',
				support:
					'https://support.theguardian.com?INTCMP=amp_header_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22amp_header_support%22%7D',
				supporter:
					'https://support.theguardian.com/subscribe?INTCMP=header_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_HEADER%22,%22componentId%22:%22header_supporter_cta%22%7D',
			},
			ampFooter: {
				contribute:
					'https://support.theguardian.com/contribute?INTCMP=amp_footer_support_contribute&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_support_contribute%22%7D',
				subscribe:
					'https://support.theguardian.com/subscribe?INTCMP=amp_footer_support_subscribe&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_support_subscribe%22%7D',
				support:
					'https://support.theguardian.com?INTCMP=footer_support&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22footer_support%22%7D',
				supporter:
					'https://support.theguardian.com/subscribe?INTCMP=amp_footer_supporter_cta&acquisitionData=%7B%22source%22:%22GUARDIAN_WEB%22,%22componentType%22:%22ACQUISITIONS_FOOTER%22,%22componentId%22:%22amp_footer_supporter_cta%22%7D',
			},
		},
	},
	author: { byline: 'Heather Stewart Political editor' },
	designType: 'Article',
	editionId: 'UK',
	format: {
		design: 'ArticleDesign',
		theme: 'NewsPillar',
		display: 'StandardDisplay',
	},
	openGraphData: {
		'og:url':
			'https://www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
		'article:author': 'https://www.theguardian.com/profile/heatherstewart',
		'og:image:width': '1200',
		'og:image':
			'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctYWdlLTIwMjIucG5n&enable=upscale&s=6ed9a129aea8ac6d39d19c2ea6186ccd',
		'al:ios:url':
			'gnmguardian://politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin?contenttype=Article&source=applinks',
		'article:publisher': 'https://www.facebook.com/theguardian',
		'og:title':
			'Keir Starmer accuses Stop the War coalition of siding with Nato’s enemies',
		'fb:app_id': '180444840287',
		'article:modified_time': '2022-02-11T05:28:38.000Z',
		'og:image:height': '720',
		'og:description':
			'Exclusive: Labour leader affirms support for transatlantic alliance and attacks organisation in which Jeremy Corbyn is leading figure',
		'og:type': 'article',
		'al:ios:app_store_id': '409128287',
		'article:section': 'Politics',
		'article:published_time': '2022-02-10T17:42:57.000Z',
		'article:tag':
			'Keir Starmer,Jeremy Corbyn,Labour,Politics,UK news,Nato,Ukraine,Foreign policy,Stop the War coalition,Russia,Europe',
		'al:ios:app_name': 'The Guardian',
		'og:site_name': 'the Guardian',
	},
	standfirst:
		'<p><strong>Exclusive:</strong> Labour leader affirms support for transatlantic alliance and attacks organisation in which Jeremy Corbyn is leading figure</p>\n<ul>\n <li><a href="https://www.theguardian.com/commentisfree/2022/feb/10/labour-nato-british-left-ukraine-keir-starmer">Keir Starmer: Labour’s commitment to Nato is unshakable</a></li>\n</ul>',
	sectionUrl: 'politics/keir-starmer',
	pageId: 'politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
	version: 3,
	tags: [
		{ id: 'politics/keir-starmer', type: 'Keyword', title: 'Keir Starmer' },
		{
			id: 'politics/jeremy-corbyn',
			type: 'Keyword',
			title: 'Jeremy Corbyn',
		},
		{ id: 'politics/labour', type: 'Keyword', title: 'Labour' },
		{ id: 'politics/politics', type: 'Keyword', title: 'Politics' },
		{ id: 'uk/uk', type: 'Keyword', title: 'UK news' },
		{ id: 'world/nato', type: 'Keyword', title: 'Nato' },
		{ id: 'world/ukraine', type: 'Keyword', title: 'Ukraine' },
		{
			id: 'politics/foreignpolicy',
			type: 'Keyword',
			title: 'Foreign policy',
		},
		{
			id: 'politics/stop-the-war-coalition',
			type: 'Keyword',
			title: 'Stop the War coalition',
		},
		{ id: 'world/russia', type: 'Keyword', title: 'Russia' },
		{ id: 'world/europe-news', type: 'Keyword', title: 'Europe' },
		{ id: 'type/article', type: 'Type', title: 'Article' },
		{ id: 'tone/news', type: 'Tone', title: 'News' },
		{
			id: 'profile/heatherstewart',
			type: 'Contributor',
			title: 'Heather Stewart',
			bylineImageUrl:
				'https://i.guim.co.uk/img/uploads/2017/10/06/Heather-Stewart.jpg?width=300&quality=85&auto=format&fit=max&s=c829565d3d57ba6dd2f14df2da810fde',
			bylineLargeImageUrl:
				'https://i.guim.co.uk/img/uploads/2017/11/29/Heather-Stewart,-L.png?width=300&quality=85&auto=format&fit=max&s=3e208cf7c745d588172dd8251caf0395',
		},
		{
			id: 'publication/theguardian',
			type: 'Publication',
			title: 'The Guardian',
		},
		{
			id: 'theguardian/mainsection',
			type: 'NewspaperBook',
			title: 'Main section',
		},
		{
			id: 'theguardian/mainsection/topstories',
			type: 'NewspaperBookSection',
			title: 'Top stories',
		},
		{
			id: 'tracking/commissioningdesk/uk-home-news',
			type: 'Tracking',
			title: 'UK Home News',
		},
	],
	pillar: 'news',
	webURL: 'https://www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
	showBottomSocialButtons: true,
	isImmersive: false,
	sectionLabel: 'Keir Starmer',
	shouldHideReaderRevenue: false,
	isAdFreeUser: false,
	pageFooter: {
		footerLinks: [
			[
				{
					text: 'About us',
					url: '/about',
					dataLinkName: 'uk : footer : about us',
					extraClasses: '',
				},
				{
					text: 'Help',
					url: '/help',
					dataLinkName: 'uk : footer : tech feedback',
					extraClasses: 'js-tech-feedback-report',
				},
				{
					text: 'Complaints & corrections',
					url: '/info/complaints-and-corrections',
					dataLinkName: 'complaints',
					extraClasses: '',
				},
				{
					text: 'SecureDrop',
					url: 'https://www.theguardian.com/securedrop',
					dataLinkName: 'securedrop',
					extraClasses: '',
				},
				{
					text: 'Work for us',
					url: 'https://workforus.theguardian.com',
					dataLinkName: 'uk : footer : work for us',
					extraClasses: '',
				},
				{
					text: 'Privacy policy',
					url: '/info/privacy',
					dataLinkName: 'privacy',
					extraClasses: '',
				},
				{
					text: 'Cookie policy',
					url: '/info/cookies',
					dataLinkName: 'cookie',
					extraClasses: '',
				},
				{
					text: 'Terms & conditions',
					url: '/help/terms-of-service',
					dataLinkName: 'terms',
					extraClasses: '',
				},
				{
					text: 'Contact us',
					url: '/help/contact-us',
					dataLinkName: 'uk : footer : contact us',
					extraClasses: '',
				},
			],
			[
				{
					text: 'All topics',
					url: '/index/subjects/a',
					dataLinkName: 'uk : footer : all topics',
					extraClasses: '',
				},
				{
					text: 'All writers',
					url: '/index/contributors',
					dataLinkName: 'uk : footer : all contributors',
					extraClasses: '',
				},
				{
					text: 'Modern Slavery Act',
					url: 'https://uploads.guim.co.uk/2023/07/25/Modern_Slavery_Statement_GMG_and_Scott_Trust_2023.docx.pdf',
					dataLinkName: 'uk : footer : modern slavery act statement',
					extraClasses: '',
				},
				{
					text: 'Digital newspaper archive',
					url: 'https://theguardian.newspapers.com',
					dataLinkName: 'digital newspaper archive',
					extraClasses: '',
				},
				{
					text: 'Facebook',
					url: 'https://www.facebook.com/theguardian',
					dataLinkName: 'uk : footer : facebook',
					extraClasses: '',
				},
				{
					text: 'YouTube',
					url: 'https://www.youtube.com/user/TheGuardian',
					dataLinkName: 'uk : footer : youtube',
					extraClasses: '',
				},
				{
					text: 'Instagram',
					url: 'https://www.instagram.com/guardian',
					dataLinkName: 'uk : footer : instagram',
					extraClasses: '',
				},
				{
					text: 'LinkedIn',
					url: 'https://www.linkedin.com/company/theguardian',
					dataLinkName: 'uk : footer : linkedin',
					extraClasses: '',
				},
				{
					text: 'Twitter',
					url: 'https://twitter.com/guardian',
					dataLinkName: 'uk: footer : twitter',
					extraClasses: '',
				},
				{
					text: 'Newsletters',
					url: '/email-newsletters?INTCMP=DOTCOM_FOOTER_NEWSLETTER_UK',
					dataLinkName: 'uk : footer : newsletters',
					extraClasses: '',
				},
			],
			[
				{
					text: 'Advertise with us',
					url: 'https://advertising.theguardian.com',
					dataLinkName: 'uk : footer : advertise with us',
					extraClasses: '',
				},
				{
					text: 'Guardian Labs',
					url: '/guardian-labs',
					dataLinkName: 'uk : footer : guardian labs',
					extraClasses: '',
				},
				{
					text: 'Search jobs',
					url: 'https://jobs.theguardian.com',
					dataLinkName: 'uk : footer : jobs',
					extraClasses: '',
				},
				{
					text: 'Patrons',
					url: 'https://patrons.theguardian.com?INTCMP=footer_patrons',
					dataLinkName: 'uk : footer : patrons',
					extraClasses: '',
				},
			],
		],
	},
	twitterData: {
		'twitter:app:id:iphone': '409128287',
		'twitter:app:name:googleplay': 'The Guardian',
		'twitter:app:name:ipad': 'The Guardian',
		'twitter:card': 'summary_large_image',
		'twitter:app:name:iphone': 'The Guardian',
		'twitter:app:id:ipad': '409128287',
		'twitter:app:id:googleplay': 'com.guardian',
		'twitter:app:url:googleplay':
			'guardian://www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
		'twitter:app:url:iphone':
			'gnmguardian://politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin?contenttype=Article&source=twitter',
		'twitter:image':
			'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctYWdlLTIwMjIucG5n&s=a50150ed9dc58af3c31d1bb5dc3494ea',
		'twitter:site': '@guardian',
		'twitter:app:url:ipad':
			'gnmguardian://politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin?contenttype=Article&source=twitter',
	},
	sectionName: 'politics',
	webPublicationDateDeprecated: '2022-02-10T17:42:57.000Z',
	pageType: {
		hasShowcaseMainElement: false,
		isFront: false,
		isLiveblog: false,
		isMinuteArticle: false,
		isPaidContent: false,
		isPreview: false,
		isSensitive: false,
	},
	hasStoryPackage: false,
	contributionsServiceUrl: 'https://contributions.guardianapis.com',
	showTableOfContents: false,
	lang: 'en',
	byline: 'Heather Stewart Political editor',
	headline:
		'Keir Starmer accuses Stop the War coalition of siding with Nato’s enemies',
	guardianBaseURL: 'https://www.theguardian.com',
	isLegacyInteractive: false,
	webPublicationDate: '2022-02-10T17:42:57.000Z',
	mainMediaElements: [
		{
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
			media: {
				allImages: [
					{
						index: 0,
						fields: { height: '1200', width: '2000' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/2000.jpg',
					},
					{
						index: 1,
						fields: { height: '600', width: '1000' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/1000.jpg',
					},
					{
						index: 2,
						fields: { height: '300', width: '500' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/500.jpg',
					},
					{
						index: 3,
						fields: { height: '84', width: '140' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/140.jpg',
					},
					{
						index: 4,
						fields: { height: '3236', width: '5390' },
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/5390.jpg',
					},
					{
						index: 5,
						fields: {
							isMaster: 'true',
							height: '3236',
							width: '5390',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg',
					},
				],
			},
			data: {
				alt: 'Jeremy Corbyn at a Stop the War coalition protest in August 2021.',
				caption:
					'Jeremy Corbyn at a Stop the War coalition protest in August 2021.',
				credit: 'Photograph: Neil Hall/EPA',
			},
			displayCredit: true,
			role: 'inline',
			imageSources: [
				{
					weighting: 'inline',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=620&quality=85&auto=format&fit=max&s=4fbbd66fa859ce005b6f3048c3ee81e8',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5d4716da999245df3a83e5e622958934',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=700&quality=85&auto=format&fit=max&s=1cb87dee5818b90e0088829f07a44942',
							width: 700,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=700&quality=45&auto=format&fit=max&dpr=2&s=6d88441a42c733a3923813a62ba1e231',
							width: 1400,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=620&quality=85&auto=format&fit=max&s=4fbbd66fa859ce005b6f3048c3ee81e8',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5d4716da999245df3a83e5e622958934',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=645&quality=85&auto=format&fit=max&s=66073f4cb6f01ce26a5f888f9a2a39d6',
							width: 645,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=645&quality=45&auto=format&fit=max&dpr=2&s=8293dc674628afd1bab6b705ce4ba117',
							width: 1290,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=465&quality=85&auto=format&fit=max&s=db845e0257e6b9ce90500422c8892a0c',
							width: 465,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=0dbd51e1d0c886a03b1748cd0f375c3c',
							width: 930,
						},
					],
				},
				{ weighting: 'thumbnail', srcSet: [] },
				{ weighting: 'supporting', srcSet: [] },
				{
					weighting: 'showcase',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1020&quality=85&auto=format&fit=max&s=04b31883c4c8626cd731716e71667cf0',
							width: 1020,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=50a25ed1ad641459ec631cdb4fb1a5c7',
							width: 2040,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=940&quality=85&auto=format&fit=max&s=ff9a42a25b2c1bc6168608d3069173df',
							width: 940,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=940&quality=45&auto=format&fit=max&dpr=2&s=0968d46a2b82e3598e0f45e84619970e',
							width: 1880,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=700&quality=85&auto=format&fit=max&s=1cb87dee5818b90e0088829f07a44942',
							width: 700,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=700&quality=45&auto=format&fit=max&dpr=2&s=6d88441a42c733a3923813a62ba1e231',
							width: 1400,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=700&quality=85&auto=format&fit=max&s=1cb87dee5818b90e0088829f07a44942',
							width: 700,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=700&quality=45&auto=format&fit=max&dpr=2&s=6d88441a42c733a3923813a62ba1e231',
							width: 1400,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=660&quality=85&auto=format&fit=max&s=0edcd436b0d45d2294f4f32e4d750975',
							width: 660,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=660&quality=45&auto=format&fit=max&dpr=2&s=f01b3533b11663edfdd0401effc9945a',
							width: 1320,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=645&quality=85&auto=format&fit=max&s=66073f4cb6f01ce26a5f888f9a2a39d6',
							width: 645,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=645&quality=45&auto=format&fit=max&dpr=2&s=8293dc674628afd1bab6b705ce4ba117',
							width: 1290,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=465&quality=85&auto=format&fit=max&s=db845e0257e6b9ce90500422c8892a0c',
							width: 465,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=0dbd51e1d0c886a03b1748cd0f375c3c',
							width: 930,
						},
					],
				},
				{ weighting: 'halfwidth', srcSet: [] },
				{
					weighting: 'immersive',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1900&quality=85&auto=format&fit=max&s=a67f20b1dc6ba426ec976fdcc8a5ff98',
							width: 1900,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1900&quality=45&auto=format&fit=max&dpr=2&s=80c459e8e2897330f67b2da3f4f40f36',
							width: 3800,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1300&quality=85&auto=format&fit=max&s=f94d5c351ab60e50bb6fe15cfce290ca',
							width: 1300,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1300&quality=45&auto=format&fit=max&dpr=2&s=83213756e067432336d64ec1f9c8b43e',
							width: 2600,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1140&quality=85&auto=format&fit=max&s=7745776741b2810830a14508615edeb5',
							width: 1140,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1140&quality=45&auto=format&fit=max&dpr=2&s=bb7d2f6087d369e8b6985b75cd697f47',
							width: 2280,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=980&quality=85&auto=format&fit=max&s=08d3315a7563764031bee70bbd3fc189',
							width: 980,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=980&quality=45&auto=format&fit=max&dpr=2&s=d93460b9b2d79a180612906e784adf9c',
							width: 1960,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=740&quality=85&auto=format&fit=max&s=bc6b0b3b5122172112bc3242df67ab42',
							width: 740,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=740&quality=45&auto=format&fit=max&dpr=2&s=289216315c9a463a4fbd432cea01337e',
							width: 1480,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=660&quality=85&auto=format&fit=max&s=0edcd436b0d45d2294f4f32e4d750975',
							width: 660,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=660&quality=45&auto=format&fit=max&dpr=2&s=f01b3533b11663edfdd0401effc9945a',
							width: 1320,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=480&quality=85&auto=format&fit=max&s=ca508afdded90a4565f3cf914785d46e',
							width: 480,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=480&quality=45&auto=format&fit=max&dpr=2&s=96f58ad652309da8c77a353498bf78d6',
							width: 960,
						},
					],
				},
			],
			elementId: '42ee9d07-9d76-4b4d-84ae-36a93def3b20',
		},
	],
	canonicalUrl:
		'https://www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
	blocks: [
		{
			id: '62050d108f08edf4e274b056',
			elements: [
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Keir Starmer has launched an outspoken attack on the <a href="https://www.theguardian.com/politics/stop-the-war-coalition" data-component="auto-linked-tag">Stop the War coalition</a>, in which Jeremy Corbyn is a leading figure, effectively accusing the campaign group of siding with Russia against Nato.</p>',
					elementId: '9581dfa2-d344-4804-aaa5-bde283aec4d2',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>In an opinion <a href="https://www.theguardian.com/commentisfree/2022/feb/10/labour-nato-british-left-ukraine-keir-starmer">article for the Guardian</a>, written on the way to Brussels where he reaffirmed Labour’s staunch support for Nato, Starmer says Stop the War are “not benign voices for peace”.</p>',
					elementId: '72e39470-8b13-4e38-8cb8-ff2ad117b6e9',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>“At best they are naive, at worst they actively give succour to authoritarian leaders who directly threaten democracies. There is nothing progressive in showing solidarity with the aggressor when our allies need our solidarity and – crucially – our practical assistance now more than ever.”</p>',
					elementId: '55859f1a-4f85-479f-9ecf-7d683141828e',
				},
				{
					_type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
					url: 'https://www.theguardian.com/commentisfree/2022/feb/10/labour-nato-british-left-ukraine-keir-starmer',
					text: 'Under my leadership, Labour’s commitment to Nato is unshakable | Keir Starmer',
					prefix: 'Related: ',
					role: 'thumbnail',
					elementId: 'd1146e67-5c74-4221-b1cd-89d6e9787a8a',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>He said Putin’s regime would see Stop the War protesters in the UK as “virtue signallers” who were “providing a smokescreen so it can go on beating up and jailing those brave individuals that dare to stand up to its despotism on the streets of Russia”.</p>',
					elementId: '09f157a7-cd2f-4c95-a898-ed364fa31173',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>He accused the group of a “kneejerk reflex: ‘Britain, Canada, the United States, France – wrong; their enemies – right’.”</p>',
					elementId: 'f1c49310-f28a-4b84-804a-dbcff456b085',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Corbyn is the deputy president of the Stop the War coalition, alongside Andrew Murray, who was chief of staff to the former Unite union leader Len McCluskey. Murray is a former communist who joined <a href="https://www.theguardian.com/politics/labour" data-component="auto-linked-tag">Labour</a> when Corbyn became leader.</p>',
					elementId: 'a5042ed4-6d37-4102-ae1c-1f5a78c4c36d',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>The group’s president is the musician Brian Eno. Stop the War was founded in the run-up to the invasion of Afghanistan in 2001, and regularly holds rallies on issues including Israel and Palestine. Its critics claim it is not just anti-war, but anti-west.</p>',
					elementId: 'd1b04416-8bce-49a3-a200-1cde3a3341f8',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Stop the War is holding an online rally on Thursday evening, with the title No War in Ukraine: Stop Nato Expansion. Speakers include Corbyn and the Labour MP Diane Abbott.</p>',
					elementId: '7066af6a-2a8a-495f-adbd-82aff9eb9fb8',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Starmer said: “Nobody wants war. At first glance some on the left may be sympathetic to those siren voices who condemn Nato. But to condemn Nato is to condemn the guarantee of democracy and security it brings and which our allies in eastern and central <a href="https://www.theguardian.com/world/europe-news" data-component="auto-linked-tag">Europe</a> are relying on as the sabre-rattling from Moscow grows ever louder.”</p>',
					elementId: 'eac2bb99-011a-4c61-a2b6-514550fd19ac',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Murray rejected the Labour leader’s criticisms, saying: “Keir Starmer ignores Nato’s actual role over the past 25 years. It is those who supported intervention in Iraq and Afghanistan and Libya who have shown solidarity with the aggressor.”</p>',
					elementId: 'c38ad5d4-72e5-4aa3-8303-ebce3038ddef',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>“Stop the War called those conflicts right when most Labour MPs did not,” he added. “Keir Starmer would do better to back the French and German governments in seeking a diplomatic solution.”</p>',
					elementId: '621bda6b-de8b-4441-ac24-b0805c465732',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Starmer has repeatedly distanced himself from Corbyn, who is currently sitting as an independent MP after having the whip removed over <a href="https://www.theguardian.com/politics/2020/oct/29/jeremy-corbyn-rejects-findings-of-report-on-antisemitism-in-labour">his response to a critical Equality and Human Rights Commission report</a> on Labour’s handling of antisemitism complaints.</p>',
					elementId: '00ba3c9d-1cb1-49e5-bff8-eb919a0385bd',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Unless he is allowed back into the fold, Corbyn will not be able to stand as a Labour candidate at the next general election. Friends have suggested he could stand as an independent.</p>',
					elementId: '5b0f798b-df4b-440d-8968-c9609e08beed',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Starmer, as he travelled to <a href="https://www.theguardian.com/world/nato" data-component="auto-linked-tag">Nato</a> on the same day as the prime minister – a rare show of unity amid political turmoil at Westminster over the lockdown parties scandal – sought to place himself in a line of senior Labour figures, including the postwar foreign secretary Ernest Bevin, who took a tough line with Soviet Russia.</p>',
					elementId: '2d7d613c-03b3-4267-908b-e844bfe811a5',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>“Attlee, Healey and Bevin saw communism for what it was and were prepared to stand up to its aggression,” he said. “Today’s Labour party has the same clear-eyed view of the current regime in the Kremlin.</p>',
					elementId: '6b30d9fc-cbf2-4170-b450-790c96dfbeec',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>“We know, as they did, that bullies only respect strength. Russian tanks sit, engines revving, on the verge of annexing Ukraine but protest placards waved here by the usual suspects condemn Nato not Moscow.”</p>',
					elementId: '0ca25774-5747-471e-8ebd-4bb7cc99bc29',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Corbyn shocked many Labour backbenchers in the aftermath of the Salisbury poisonings in 2018 when he declined to attribute responsibility for the attacks to Moscow without “incontrovertible evidence”.</p>',
					elementId: '43d1be51-5c72-4a11-8d0e-d3d7a9de69f8',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Asked in a BBC interview in Brussels how he had served in Corbyn’s shadow cabinet despite their difference of view over Nato, Starmer said: “Jeremy Corbyn had a very different view. He was wrong about that. And I spoke out at the time and said he was wrong about that.”</p>',
					elementId: '95e0c9c3-ad4e-43de-9fbe-a8b28d6dad1d',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>On Salisbury, he said: “He was wrong in relation to the Salisbury poisoning incident, where he didn’t respond appropriately. I said so at the time, but it’s very important to me, this is my first chance as leader of the Labour party to come here to Nato headquarters to have the meeting with the secretary general and to deliver a very important message for our party and for our country, which is that the Labour party support for Nato is unshakable.”</p>',
					elementId: '4a291729-bd4c-4d43-8da7-147eaed3e260',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>Some Labour strategists believe Corbyn’s apparent ambivalence over Russia’s role in the poisonings was a key reason for the public scepticism about his leadership that contributed to Labour’s disastrous performance at the 2019 general election.</p>',
					elementId: '59b6f4f9-2114-458b-a39c-e38d775675c0',
				},
				{
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>However, Corbyn’s supporters blame highly critical media reporting of the then Labour leader, as well as the debilitating parliamentary battle over Brexit that divided the party.</p>',
					elementId: '2dbec612-ede0-4cdb-9508-a91254650d0e',
				},
			],
			attributes: { pinned: false, keyEvent: false, summary: false },
			blockCreatedOn: 1644510670000,
			blockCreatedOnDisplay: '16.31 GMT',
			blockLastUpdated: 1644517288000,
			blockLastUpdatedDisplay: '18.21 GMT',
			blockFirstPublished: 1644510670000,
			blockFirstPublishedDisplay: '16.31 GMT',
			blockFirstPublishedDisplayNoTimezone: '16.31',
			contributors: [],
			primaryDateLine: 'Thu 10 Feb 2022 17.42 GMT',
			secondaryDateLine: 'First published on Thu 10 Feb 2022 16.31 GMT',
		},
	],
	linkedData: [
		{
			'@type': 'NewsArticle',
			'@context': 'https://schema.org',
			'@id': 'https://www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
			publisher: {
				'@type': 'Organization',
				'@context': 'https://schema.org',
				'@id': 'https://www.theguardian.com#publisher',
				name: 'The Guardian',
				url: 'https://www.theguardian.com/',
				logo: {
					'@type': 'ImageObject',
					url: 'https://uploads.guim.co.uk/2018/01/31/TheGuardian_AMP.png',
					width: 190,
					height: 60,
				},
				sameAs: [
					'https://www.facebook.com/theguardian',
					'https://twitter.com/guardian',
					'https://www.youtube.com/user/TheGuardian',
				],
			},
			isAccessibleForFree: true,
			isPartOf: {
				'@type': ['CreativeWork', 'Product'],
				name: 'The Guardian',
				productID: 'theguardian.com:basic',
			},
			image: [
				'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctYWdlLTIwMjIucG5n&enable=upscale&s=6ed9a129aea8ac6d39d19c2ea6186ccd',
				'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d3d6843f77af2283824c3733113e142b',
				'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=d8ec0bf2029eaa56455bee31089cd5f7',
				'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1200&quality=85&auto=format&fit=max&s=32c7d268abe20b60abb37a03e9c4d1bb',
			],
			author: [
				{
					'@type': 'Person',
					name: 'Heather Stewart',
					sameAs: 'https://www.theguardian.com/profile/heatherstewart',
				},
			],
			datePublished: '2022-02-10T17:42:57.000Z',
			headline:
				'Keir Starmer accuses Stop the War coalition of siding with Nato’s enemies',
			dateModified: '2022-02-11T05:28:38.000Z',
			mainEntityOfPage:
				'https://www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
		},
		{
			'@type': 'WebPage',
			'@context': 'https://schema.org',
			'@id': 'https://www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
			potentialAction: {
				'@type': 'ViewAction',
				target: 'android-app://com.guardian/https/www.theguardian.com/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
			},
		},
	],
	webPublicationDateDisplay: 'Thu 10 Feb 2022 17.42 GMT',
	shouldHideAds: false,
	webTitle:
		'Keir Starmer accuses Stop the War coalition of siding with Nato’s enemies',
	isSpecialReport: false,
	isCommentable: false,
	keyEvents: [],
	filterKeyEvents: false,
	config: {
		avatarApiUrl: 'https://avatar.theguardian.com',
		references: [
			{
				'rich-link':
					'https://www.theguardian.com/info/2015/dec/08/daily-email-uk',
			},
		],
		isProd: true,
		shortUrlId: '/p/kjnz8',
		hasYouTubeAtom: false,
		switches: {
			lightbox: false,
			prebidAppnexusUkRow: true,
			abSignInGateMainVariant: true,
			commercialMetrics: true,
			prebidTrustx: true,
			scAdFreeBanner: false,
			abSignInGateCopyTestJan2023: false,
			adaptiveSite: true,
			prebidPermutiveAudience: true,
			compareVariantDecision: false,
			adFreeStrictExpiryEnforcement: false,
			enableSentryReporting: true,
			lazyLoadContainers: true,
			ampArticleSwitch: true,
			remarketing: true,
			verticalVideo: false,
			abPublicGoodTest: true,
			registerWithPhone: false,
			abBillboardsInMerchHigh: true,
			keyEventsCarousel: true,
			targeting: true,
			remoteHeader: true,
			slotBodyEnd: true,
			prebidImproveDigitalSkins: true,
			ampPrebidOzone: true,
			extendedMostPopularFronts: true,
			emailInlineInFooter: true,
			showNewPrivacyWordingOnEmailSignupEmbeds: true,
			deeplyRead: true,
			prebidAnalytics: true,
			extendedMostPopular: true,
			ampContentAbTesting: false,
			prebidCriteo: true,
			verticalVideoSurvey: false,
			okta: true,
			abDeeplyReadArticleFooter: false,
			puzzlesBanner: false,
			imrWorldwide: true,
			acast: true,
			automaticFilters: true,
			twitterUwt: true,
			prebidAppnexusInvcode: true,
			ampPrebidPubmatic: true,
			frontsBannerAdsDcr: true,
			a9HeaderBidding: true,
			prebidAppnexus: true,
			enableDiscussionSwitch: true,
			prebidXaxis: true,
			stickyVideos: true,
			interactiveFullHeaderSwitch: true,
			discussionAllPageSize: true,
			prebidUserSync: true,
			audioOnwardJourneySwitch: true,
			brazeTaylorReport: false,
			abConsentlessAds: true,
			externalVideoEmbeds: true,
			simpleReach: true,
			abIntegrateIma: true,
			callouts: true,
			sentinelLogger: true,
			geoMostPopular: true,
			weAreHiring: false,
			relatedContent: true,
			thirdPartyEmbedTracking: true,
			prebidOzone: true,
			ampLiveblogSwitch: true,
			ampAmazon: true,
			prebidAdYouLike: true,
			mostViewedFronts: true,
			optOutAdvertising: true,
			abSignInGateMainControl: true,
			headerTopNav: true,
			googleSearch: true,
			prebidKargo: true,
			consentManagement: true,
			brazeSwitch: true,
			scheduler: false,
			personaliseSignInGateAfterCheckout: true,
			redplanetForAus: true,
			prebidSonobi: true,
			idProfileNavigation: true,
			confiantAdVerification: true,
			discussionAllowAnonymousRecommendsSwitch: false,
			permutive: true,
			comscore: true,
			headerTopBarSearchCapi: false,
			ampPrebidCriteo: true,
			abLiveblogRightColumnAds: true,
			newsletterOnwards: false,
			webFonts: true,
			europeNetworkFront: true,
			prebidImproveDigital: true,
			offerHttp3: true,
			ophan: true,
			crosswordSvgThumbnails: true,
			prebidTriplelift: true,
			weather: true,
			disableAmpTest: true,
			prebidPubmatic: true,
			abLimitInlineMerch: false,
			serverShareCounts: false,
			autoRefresh: true,
			enhanceTweets: true,
			prebidIndexExchange: true,
			prebidOpenx: true,
			abElementsManager: true,
			prebidHeaderBidding: true,
			idCookieRefresh: true,
			serverSideLiveblogInlineAds: true,
			discussionPageSize: true,
			smartAppBanner: false,
			sectionFrontsBannerAds: true,
			abPrebidKargo: true,
			boostGaUserTimingFidelity: false,
			historyTags: true,
			brazeContentCards: true,
			surveys: true,
			remoteBanner: true,
			emailSignupRecaptcha: true,
			prebidSmart: true,
			shouldLoadGoogletag: true,
			inizio: true,
		},
		inBodyInternalLinkCount: 4,
		keywordIds:
			'politics/keir-starmer,politics/jeremy-corbyn,politics/labour,politics/politics,uk/uk,world/nato,world/ukraine,politics/foreignpolicy,politics/stop-the-war-coalition,world/russia,world/europe-news',
		blogIds: '',
		sharedAdTargeting: {
			ct: 'article',
			su: ['0'],
			edition: 'uk',
			tn: ['news'],
			p: 'ng',
			k: [
				'jeremy-corbyn',
				'politics',
				'europe-news',
				'russia',
				'ukraine',
				'keir-starmer',
				'labour',
				'uk/uk',
				'nato',
				'stop-the-war-coalition',
				'foreignpolicy',
			],
			sh: 'https://www.theguardian.com/p/kjnz8',
			co: ['heatherstewart'],
			url: '/politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
		},
		beaconUrl: '//phar.gu-web.net',
		campaigns: [],
		calloutsUrl:
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		requiresMembershipAccess: false,
		onwardWebSocket:
			'ws://api.nextgen.guardianapps.co.uk/recently-published',
		hasMultipleVideosInPage: false,
		pbIndexSites: [
			{ bp: 'D', id: 208229 },
			{ bp: 'M', id: 213502 },
			{ bp: 'T', id: 215437 },
		],
		a9PublisherId: '3722',
		toneIds: 'tone/news',
		dcrSentryDsn:
			'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
		idWebAppUrl: 'https://oauth.theguardian.com',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
		omnitureAccount: 'guardiangu-network',
		contributorBio: '',
		pageCode: '11020220',
		pillar: 'News',
		commercialBundleUrl:
			'https://assets.guim.co.uk/javascripts/commercial/d62834a6c1c769c30c02/graun.standalone.commercial.js',
		discussionApiClientHeader: 'nextgen',
		membershipUrl: 'https://membership.theguardian.com',
		cardStyle: 'news',
		sentryHost: 'app.getsentry.com/35463',
		shouldHideAdverts: false,
		shouldHideReaderRevenue: false,
		isPreview: false,
		membershipAccess: '',
		googletagJsUrl: '//securepubads.g.doubleclick.net/tag/js/gpt.js',
		supportUrl: 'https://support.theguardian.com',
		hasShowcaseMainElement: false,
		isColumn: false,
		isPaidContent: false,
		sectionName: 'Politics',
		mobileAppsAdUnitRoot: 'beta-guardian-app',
		dfpAdUnitRoot: 'theguardian.com',
		headline:
			'Keir Starmer accuses Stop the War coalition of siding with Nato’s enemies',
		commentable: false,
		idApiUrl: 'https://idapi.theguardian.com',
		showRelatedContent: true,
		commissioningDesks: 'uk-home-news',
		inBodyExternalLinkCount: 0,
		adUnit: '/59666047/theguardian.com/politics/article/ng',
		stripePublicToken: 'pk_live_2O6zPMHXNs2AGea4bAmq5R7Z',
		googleRecaptchaSiteKey: '6LdzlmsdAAAAALFH63cBVagSFPuuHXQ9OfpIDdMc',
		videoDuration: 0,
		stage: 'PROD',
		idOAuthUrl: 'https://oauth.theguardian.com',
		isSensitive: false,
		richLink: '/info/2015/dec/08/daily-email-uk',
		isDev: false,
		thirdPartyAppsAccount: 'guardiangu-thirdpartyapps',
		avatarImagesUrl: 'https://avatar.guim.co.uk',
		trackingNames: 'UK Home News',
		fbAppId: '180444840287',
		externalEmbedHost: 'https://embed.theguardian.com',
		ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
		keywords:
			'Keir Starmer,Jeremy Corbyn,Labour,Politics,UK news,Nato,Ukraine,Foreign policy,Stop the War coalition,Russia,Europe',
		revisionNumber: 'DEV',
		blogs: '',
		section: 'politics',
		hasInlineMerchandise: true,
		locationapiurl: '/weatherapi/locations?query=',
		buildNumber: 'DEV',
		isPhotoEssay: false,
		ampIframeUrl:
			'https://assets.guim.co.uk/data/vendor/2533d5cb94302889e6a8f1b24b5329e7/amp-iframe.html',
		userAttributesApiUrl:
			'https://members-data-api.theguardian.com/user-attributes',
		isLive: false,
		publication: 'The Guardian',
		brazeApiKey: '7f28c639-8bda-48ff-a3f6-24345abfc07c',
		host: 'https://www.theguardian.com',
		contentType: 'Article',
		facebookIaAdUnitRoot: 'facebook-instant-articles',
		ophanEmbedJsUrl: '//j.ophan.co.uk/ophan.embed',
		idUrl: 'https://profile.theguardian.com',
		thumbnail:
			'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/500.jpg?quality=85&auto=format&fit=max&s=5291de373a0518a782f05fe1a1d2916d',
		wordCount: 844,
		isFront: false,
		author: 'Heather Stewart',
		nonKeywordTagIds:
			'type/article,tone/news,profile/heatherstewart,publication/theguardian,theguardian/mainsection,theguardian/mainsection/topstories,tracking/commissioningdesk/uk-home-news',
		dfpAccountId: '59666047',
		pageId: 'politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
		isAdFree: false,
		forecastsapiurl: '/weatherapi/forecast',
		assetsPath: 'https://assets.guim.co.uk/',
		lightboxImages: {
			id: 'politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
			headline:
				'Keir Starmer accuses Stop the War coalition of siding with Nato’s enemies',
			shouldHideAdverts: false,
			standfirst:
				'<p><strong>Exclusive:</strong> Labour leader affirms support for transatlantic alliance and attacks organisation in which Jeremy Corbyn is leading figure</p><ul><li><a href="https://www.theguardian.com/commentisfree/2022/feb/10/labour-nato-british-left-ukraine-keir-starmer">Keir Starmer: Labour’s commitment to Nato is unshakable</a></li></ul>',
			images: [
				{
					caption:
						'Jeremy Corbyn at a Stop the War coalition protest in August 2021.',
					credit: 'Photograph: Neil Hall/EPA',
					displayCredit: true,
					src: 'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=700&quality=85&auto=format&fit=max&s=1cb87dee5818b90e0088829f07a44942',
					srcsets:
						'https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1920&quality=85&auto=format&fit=max&s=9218b02257d5bbf9780f657b11481312 1920w, https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1225&quality=85&auto=format&fit=max&s=61a8cf31fc292172b38d031a4c5bf21a 1225w, https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=1065&quality=85&auto=format&fit=max&s=b224e011549ddcbca417019edb659ebd 1065w, https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=965&quality=85&auto=format&fit=max&s=d93bff095b149af04d036e52272c3756 965w, https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=725&quality=85&auto=format&fit=max&s=1e1fe498268e81e1ce1a01cb7d32b95d 725w, https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=645&quality=85&auto=format&fit=max&s=66073f4cb6f01ce26a5f888f9a2a39d6 645w, https://i.guim.co.uk/img/media/ca1ab65e57b67491418deb6430ed72d2c5ce6fdd/0_329_5390_3236/master/5390.jpg?width=465&quality=85&auto=format&fit=max&s=db845e0257e6b9ce90500422c8892a0c 465w',
					sizes: '(min-width: 1300px) 1920px, (min-width: 1140px) 1225px, (min-width: 980px) 1065px, (min-width: 740px) 965px, (min-width: 660px) 725px, (min-width: 480px) 645px, 465px',
					ratio: 1.665636588380717,
					role: 'None',
					parentContentId:
						'politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
					id: 'politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
				},
			],
		},
		isImmersive: false,
		dfpHost: 'pubads.g.doubleclick.net',
		googletagUrl: '//securepubads.g.doubleclick.net/tag/js/gpt.js',
		mmaUrl: 'https://manage.theguardian.com',
		abTests: { deeplyReadVariant: 'variant', oktaVariant: 'variant' },
		shortUrl: 'https://www.theguardian.com/p/kjnz8',
		isContent: true,
		contentId:
			'politics/2022/feb/10/keir-starmer-says-stop-the-war-coalition-gives-help-to-authoritarians-like-putin',
		edition: 'UK',
		discussionFrontendUrl:
			'https://assets.guim.co.uk/discussion/discussion-frontend.preact.iife.strict-sanctions-check-parameter.js',
		ipsosTag: 'politics',
		ophanJsUrl: '//j.ophan.co.uk/ophan.ng',
		productionOffice: 'Uk',
		plistaPublicApiKey: '462925f4f131001fd974bebe',
		tones: 'News',
		isLiveBlog: false,
		frontendAssetsFullURL: 'https://assets.guim.co.uk/',
		googleSearchId: '007466294097402385199:m2ealvuxh1i',
		allowUserGeneratedContent: false,
		byline: 'Heather Stewart Political editor',
		authorIds: 'profile/heatherstewart',
		webPublicationDate: 1644514977000,
		omnitureAmpAccount: 'guardiangu-thirdpartyapps',
		isHosted: false,
		hasPageSkin: false,
		webTitle:
			'Keir Starmer accuses Stop the War coalition of siding with Nato’s enemies',
		discussionD2Uid: 'zHoBy6HNKsk',
		weatherapiurl: '/weatherapi/city',
		googleSearchUrl: '//www.google.co.uk/cse/cse.js',
		optimizeEpicUrl:
			'https://support.theguardian.com/epic/control/index.html',
		isSplash: false,
		isNumberedList: false,
	},
};

export { articles, Standard };
