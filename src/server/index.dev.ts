import { bootstrap } from './index';

import * as devMiddleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';
import * as webpackConfig from '../../scripts/webpack.client.prod';

webpackConfig.entry.main = [
	webpackConfig.entry.main,
	'webpack-hot-middleware/client?timeout=2000&overlay=false'
];
webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin()

]
webpackConfig.devServer = {
	hot: true
};

const compile = webpack(webpackConfig);

async function dev(app, nest) {
	app.use(devMiddleware(compile));
	app.use(hotMiddleware(compile));
}

bootstrap(dev);
