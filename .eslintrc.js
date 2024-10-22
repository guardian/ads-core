module.exports = {
	root: true,
	plugins: ['@typescript-eslint', 'import'],
	extends: [
		'@guardian/eslint-config-typescript',
		'plugin:import/recommended',
	],
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	rules: {
		'id-denylist': ['error'],
		// TODO - remove these rule once we've migrated to commercial-core
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/unbound-method': 'off',
		curly: ['error', 'multi-line'],
		'no-use-before-define': ['error', { functions: true, classes: true }],
		'import/exports-last': 'error',
		'no-else-return': 'error',
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: [
							'core/*',
							'define/*',
							'display/*',
							'events/*',
							'experiments/*',
							'init/*',
							'lib/*',
							'insert/*',
							'types/*',
							'utils/*',
						],
						message:
							'Non-relative imports from src are forbidden. Please use a relative path instead',
					},
				],
			},
		],
	},
	overrides: [
		{
			files: ['*.spec.ts'],
			rules: {
				// This rule erroneously flags up instances where you expect(obj.fn).toHaveBeenCalled
				// Enabled for test files only
				'@typescript-eslint/unbound-method': 'off',
			},
		},
	],
	ignorePatterns: ['*.js', 'dist', 'src/__vendor', '.eslintrc.js'],
	settings: {
		'import/resolver': {
			alias: {
				map: [['svgs', './static/svg']],
			},
		},
	},
	env: {
		jest: true,
		browser: true,
		node: true,
	},
	globals: { googletag: 'readonly' },
};
