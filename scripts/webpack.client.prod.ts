import * as webpack from 'webpack';
import * as Html from 'html-webpack-plugin';
import * as Extract from 'extract-text-webpack-plugin';
import * as merge from 'webpack-merge';

const Uglify = require('uglifyjs-webpack-plugin');

import { paths, loaders, commonConfig } from './webpack.common';

const config: any = {
	entry: {
		main: paths.clientPath('main.tsx'),
		vendor: [
			'react',
			'react-dom',
			'react-router-dom',
			'redux',
			'react-redux',
			'axios',
			'redux-observable'
		]
	},
	output: {
		path: `${__dirname}/../dist/client`,
		filename: 'js/[name].[chunkhash].js',
		publicPath: '/',
		chunkFilename: 'js/[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [ loaders.ts ],
				exclude: /node_modules/
			},
			{
				test: /\.async\.tsx?$/,
				use: [ loaders.lazy, loaders.ts ],
				exclude: /node_modules/
			}
		]
	},

	plugins: [
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(false),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
		new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
		new Uglify({
			uglifyOptions: {
				compress: { warnings: false },
				comments: false
			}
		})
	]
};

export default merge(commonConfig, config);
