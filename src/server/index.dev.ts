import { bootstrap } from './index';

import * as devMiddleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';
import webpackConfig from '../../scripts/webpack.client.prod';

webpackConfig.module.rules[0].use.unshift('react-hot-loader/webpack');

webpackConfig.plugins.forEach((element, index) => {
    if (
        element.chunkNames ||
        (element.options && element.options.uglifyOptions)
    ) {
        webpackConfig.plugins[index] = undefined
    }
});
webpackConfig.plugins = webpackConfig.plugins.filter(e => !!e)

webpackConfig.devtool = 'source-map';
webpackConfig.entry.main = [
    'react-hot-loader/patch',
    webpackConfig.entry.main,
    'webpack-hot-middleware/client?timeout=2000&overlay=false'
];
webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
];
webpackConfig.devServer = {
    hot: true
};

const compile = webpack(webpackConfig);

async function dev(app, nest) {
    app.use(devMiddleware(compile));
    app.use(hotMiddleware(compile));
}

bootstrap(dev);
