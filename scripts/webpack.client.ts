import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as Html from 'html-webpack-plugin';
import { exec } from 'child_process';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

const development = process.env.NODE_ENV === 'development';
const clientDevPath = path.resolve(__dirname, '../src/client');
const tsconfigFile = path.resolve(clientDevPath, 'tsconfig.json');
const distPath = `${__dirname}/../dist/client`;
const resolve = (p) => path.resolve(clientDevPath, p);
const loaders = {
	ts: {
		loader: 'ts-loader',
		options: { configFile: tsconfigFile }
	},
	lazy: 'bundle-loader?lazy',
	hot: 'react-hot-loader/webpack'
};
const injectJss = `
<script src="https://unpkg.com/react@16.1.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.1.1/umd/react-dom.production.min.js"></script>
<script src='https://unpkg.com/react-router-dom@4.2.2/umd/react-router-dom.min.js'></script>
<script src="https://unpkg.com/redux@3.7.2/dist/redux.min.js"></script>
<script src="https://unpkg.com/react-redux@5.0.6/dist/react-redux.min.js"></script>
`;

const vendor = [
	'react',
	'react-dom',
	'react-router-dom',
	'redux',
	'react-redux',
	'axios',
	'redux-observable'
];

const main = development
	? [ 'react-hot-loader/patch', 'webpack-hot-middleware/client', resolve('main.tsx') ]
	: resolve('main.tsx');

console.log('webpack env::', process.env.NODE_ENV);
exec(`rm -r ${distPath}`);

const config: any = {
	devtool: 'source-map',
	entry: development ? { main } : { main, vendor },
	output: {
		path: distPath,
		filename: development ? 'js/[name].js' : 'js/[name].[chunkhash].js',
		publicPath: '/',
		chunkFilename: development ? 'js/[name].js' : 'js/[name].[chunkhash].js'
	},
	externals: development
		? {}
		: {
				react: 'window.React',
				redux: 'window.Redux',
				'react-dom': 'window.ReactDOM',
				'react-redux': 'window.ReactRedux',
				'react-router-dom': 'window.ReactRouterDOM'
			},
	resolve: {
		alias: {
			'@components': resolve('@components'),
			'@pages': resolve('@pages'),
			'@store': resolve('@store'),
			'@util': resolve('@util'),
			'@servers': resolve('@servers')
		},
		extensions: [ '.ts', '.tsx', '.js', 'jsx', '.less', '.css' ]
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
		new webpack.EnvironmentPlugin({ NODE_ENV: process.env.NODE_ENV }),
		new ForkTsCheckerWebpackPlugin({ tsconfig: tsconfigFile }),
		new Html({
			template: resolve('index.html'),
			filename: development ? 'index.html' : 'app/index.html', //output
			inject: 'body',
			__js: development ? '' : injectJss,
			minify: {
				minifyCSS: true,
				minifyJS: true,
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true
			},
			chunksSortMode: 'dependency'
		}),

		development ? new webpack.optimize.ModuleConcatenationPlugin() : null,
		development ? new webpack.NamedModulesPlugin() : null,
		development ? new webpack.HotModuleReplacementPlugin() : null,
		development ? new webpack.NoEmitOnErrorsPlugin() : null,

		development ? null : new webpack.HashedModuleIdsPlugin(),
		development ? null : new webpack.optimize.OccurrenceOrderPlugin(false),
		development ? null : new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
		development ? null : new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
		development ? null : new webpack.optimize.ModuleConcatenationPlugin(),
		development
			? null
			: new Uglify({
					uglifyOptions: {
						compress: { warnings: false },
						comments: false
					}
				})
	].filter(Boolean),
	devServer: development ? { hot: true, historyApiFallback: true } : {}
};

export default config;
