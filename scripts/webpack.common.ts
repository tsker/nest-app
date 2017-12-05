import * as path from 'path';
import * as webpack from 'webpack';
import * as Html from 'html-webpack-plugin';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let clientDevPath = path.resolve(__dirname, '../src/client');
let tsconfigFile = path.resolve(clientDevPath, 'tsconfig.json');

console.log('webpack env::', process.env.NODE_ENV);

export const paths = {
	clientPath: (p) => path.resolve(clientDevPath, p),
	dist:`${__dirname}/../dist/client`
};

export const loaders = {
	ts: {
		loader: 'ts-loader',
		options: {
			configFile: tsconfigFile
		}
	},
	lazy: 'bundle-loader?lazy',
	hot: 'react-hot-loader/webpack'
};

export const commonConfig = {
	resolve: {
		alias: {
			'@components': paths.clientPath('@components'),
			'@pages': paths.clientPath('@pages'),
			'@store': paths.clientPath('@store'),
			'@util': paths.clientPath('@util'),
			'@servers': paths.clientPath('@servers')
		},
		extensions: [ '.ts', '.tsx', '.js', 'jsx', '.less', '.css' ]
	},
	externals: {
		react: 'window.React',
		redux: 'window.Redux',
		'react-dom': 'window.ReactDOM',
		'react-redux': 'window.ReactRedux',
		'react-router-dom': 'window.ReactRouterDOM'
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: process.env.NODE_ENV
		}),
		new ForkTsCheckerWebpackPlugin({
			tsconfig: tsconfigFile
		}),
		new Html({
			template: paths.clientPath('index.html'),
			filename: 'index.html', //output
			inject: 'body',
			minify: {
				minifyCSS: true,
				minifyJS: true,
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true
			},
			chunksSortMode: 'dependency'
		})
	]
};
