import { execSync } from 'child_process';
import { join } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import { PROutPlugin } from './webpack/prout-plugin';
import { UpdateParameterStorePlugin } from './webpack/update-parameter-store-plugin';
import config from './webpack.config.mjs';

const { DefinePlugin } = webpack;

const gitCommitSHA = () => {
	try {
		const commitSHA = execSync('git rev-parse HEAD').toString().trim();
		return { 'process.env.COMMIT_SHA': JSON.stringify(commitSHA) };
	} catch (_) {
		return {};
	}
};

const prefix = process.env.BUNDLE_PREFIX ?? '[chunkhash]/';

// eslint-disable-next-line import/no-default-export -- webpack config
export default merge(config, {
	mode: 'production',
	output: {
		filename: `commercial/${prefix}graun.standalone.commercial.js`,
		chunkFilename: `commercial/${prefix}graun.[name].commercial.js`,
		path: join(import.meta.dirname, 'dist', 'riff-raff', 'js'),
		publicPath: 'auto',
		clean: true,
	},
	devtool: 'source-map',
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- circular-dependency-plugin is not typed
		new BundleAnalyzerPlugin({
			reportFilename: './commercial-bundle-analyzer-report.html',
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.OVERRIDE_BUNDLE_PATH': JSON.stringify(false),
			'process.env.RIFFRAFF_DEPLOY': JSON.stringify(true),
			...gitCommitSHA(),
		}),
		new UpdateParameterStorePlugin(),
		new PROutPlugin(),
	],
});
