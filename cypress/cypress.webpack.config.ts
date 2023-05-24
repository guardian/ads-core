import path from 'path';

export default {
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			lib: path.resolve(__dirname, '../src/lib/'),
			common: path.resolve(__dirname, '../src/projects/common/'),
			projects: path.resolve(__dirname, '../src/projects/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)$/,
				// have to transpile some @guardian modules because cypress needs <=ES2019
				exclude: [/node_modules\/(?!@guardian)/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript',
							],
						},
					},
				],
			},
		],
	},
};
