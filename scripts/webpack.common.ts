import * as webpack from 'webpack';
import * as Html from 'html-webpack-plugin';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

let clientDevPath = `${__dirname}/../src/client`;
let tsconfigFile = `${clientDevPath}/tsconfig.json`;

console.log('webpack env::', process.env.NODE_ENV);

export const paths = {
     clientDevPath,
     tsconfigFile
}

export const loaders = {
	ts: {
		loader: 'ts-loader',
		options: {
			configFile: tsconfigFile
		}
	},
	lazy: 'bundle-loader?lazy',
	hot: 'react-hot-loader/webpack'
}

export const commonConfig =  {
    resolve: {
		alias: {
			'@components': `${clientDevPath}/@components`,
			'@pages': `${clientDevPath}/@pages`,
			'@store': `${clientDevPath}/@store`,
			'@servers': `${clientDevPath}/@servers`,
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
	plugins:[
		new webpack.EnvironmentPlugin({
			NODE_ENV: process.env.NODE_ENV
		}),
		new ForkTsCheckerWebpackPlugin({
			tsconfig: paths.tsconfigFile
		}),
		new Html({
			template: `${paths.clientDevPath}/index.html`,
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
}

