import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as Html from 'html-webpack-plugin';
import { exec } from 'child_process';
import { compose } from 'redux';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Manifest = require('webpack-manifest-plugin');

import {
	development,
	clientDevPath,
	resolve,
	distPath,
	aliasDir,
	tsconfigFile,
	main,
	jsFilename,
	loaders,
	injectPackageToWidow
} from './options';

console.log('webpack env::', process.env.NODE_ENV);
!development && exec(`rm -r ${distPath}`);

const config: any = {
	mode: process.env.NODE_ENV,
	devtool: 'inline-source-map',
	entry: { main },
	output: {
		path: distPath,
		filename: jsFilename,
		publicPath: '/',
		chunkFilename: jsFilename
	},
	externals: injectPackageToWidow.externals,
	resolve: {
		alias: aliasDir,
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
			},
			{
				test: /\.(le|c)ss$/,
				use: development
					? [ loaders.style, loaders.css, loaders.less ]
					: [ MiniCssExtractPlugin.loader, loaders.css, loaders.less ]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: loaders.url,
				include: clientDevPath,
				options: {
					limit: 10,
					name: 'img/[name].[ext]'
				}
			}
		].filter(Boolean)
	},
	optimization: development
		? {}
		: {
				splitChunks: {
					cacheGroups: {
						vendor: {
							test: /node_modules/, // 指定是node_modules下的第三方包
							chunks: 'initial',
							name: 'vendor', // 打包后的文件名，任意命名
							// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
							priority: 10
						},
						styles: {
							name: 'styles',
							test: /\.(le|c)ss$/,
							chunks: 'all',
							enforce: true
						}
					}
				}
			},
	plugins: [
		new webpack.EnvironmentPlugin({ NODE_ENV: process.env.NODE_ENV }),
		new ForkTsCheckerWebpackPlugin({ tsconfig: tsconfigFile }),
		new Html({
			template: resolve('index.html'),
			filename: 'index.html' , //output
			inject: 'body',
			__js: injectPackageToWidow.templateJss,
			minify: {
				minifyCSS: true,
				minifyJS: true,
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true
			},
			chunksSortMode: 'dependency'
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

		development ? new webpack.optimize.ModuleConcatenationPlugin() : null,
		development ? new webpack.NamedModulesPlugin() : null,
		development ? new webpack.HotModuleReplacementPlugin() : null,
		development ? new webpack.NoEmitOnErrorsPlugin() : null,

		development ? null : new Manifest(),
		development ? null : new webpack.HashedModuleIdsPlugin(),
		development ? null : new webpack.optimize.OccurrenceOrderPlugin(false),
		// development ? null : new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }), // webpack 4 delete
		// development ? null : new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }), // webpack 4 delete
		// development ? null : new webpack.optimize.ModuleConcatenationPlugin(), // webpack 4 defualt exist
		// development ? null : new BundleAnalyzerPlugin(),
		development ? null : new OptimizeCSSAssetsPlugin({}),
		development
			? null
			: new MiniCssExtractPlugin({
					// Options similar to the same options in webpackOptions.output
					// both options are optional
					filename: 'css/main-[chunkhash:8].css',
					// chunkFilename: 'css/[id]-[name]-[chunkhash:8].css'
				}),
		development
			? null
			: // webpack 4 默认提供？？？
				new Uglify({
					uglifyOptions: {
						compress: { warnings: false },
						comments: false
					}
				})
	].filter(Boolean),
	devServer: development ? { hot: true, historyApiFallback: true } : {}
};

export default config;
