import * as webpack from 'webpack';
import * as Html from 'html-webpack-plugin';
import * as Uglify from 'uglifyjs-webpack-plugin';
import * as Extract from 'extract-text-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

console.log('webpack env::', process.env.NODE_ENV);
let clientDevPath = `${__dirname}/../src/client`;
let tsconfigFile = `${clientDevPath}/tsconfig.json`;

const loaders = {
	ts: {
		loader: 'ts-loader',
		options: {
			configFile: tsconfigFile
		}
	},
	lazy: 'bundle-loader?lazy'
};

const config: any = {
	entry: {
		main: `${clientDevPath}/main.tsx`,
		vendor: [ 'react', 'react-dom', 'react-router-dom', 'redux', 'react-redux' ]
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
	resolve: {
		alias: {
			components: `${clientDevPath}/components`,
			pages: `${clientDevPath}/pages`
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
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(false),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
		new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
		new Uglify({
			uglifyOptions: {
				compress: { warnings: false },
				comments: false
			}
		}),
		new Html({
			template: `${clientDevPath}/index.html`,
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

export default config;
