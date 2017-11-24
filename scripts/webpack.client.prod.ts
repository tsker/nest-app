const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const Extract = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let clientDevPath = `${__dirname}/../src/client`;
let tsconfigFile = `${clientDevPath}/tsconfig.json`;

const config: any = {
	entry: {
		main: `${clientDevPath}/main.tsx`,
		vendor: [ 'react', 'react-dom' ]
	},
	output: {
		path: `${__dirname}/../dist/client`,
		filename: 'js/[name].js',
		publicPath: '/',
		chunkFilename: 'js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: tsconfigFile
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			components: `${clientDevPath}/@components`
		},
		extensions: [ '.ts', '.tsx', '.js', 'jsx', '.less', '.css' ]
	},
	externals: {
		react: 'window.React',
		'react-dom': 'window.ReactDOM'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor'),
		new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ForkTsCheckerWebpackPlugin({
			tsconfig: tsconfigFile
		}),
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


export default config