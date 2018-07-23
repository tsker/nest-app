import { bootstrap } from './index';

import * as devMiddleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';
import webpackConfig from '../../scripts/webpack.client';

async function dev (app, nest) {
    const compile = webpack(webpackConfig);

    app.use(devMiddleware(compile));
    app.use(hotMiddleware(compile));
}

bootstrap(dev);
