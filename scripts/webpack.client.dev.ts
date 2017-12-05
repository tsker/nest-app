import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import { paths, loaders, commonConfig } from './webpack.common';

const config: any = {
    devtool: 'source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?timeout=2000&overlay=false',
            paths.clientPath('main.tsx')
        ]
    },
    output: {
        path: paths.dist,
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [loaders.hot, loaders.ts],
                exclude: /node_modules/
            },
            {
                test: /\.async\.tsx?$/,
                use: [loaders.hot, loaders.lazy, loaders.ts],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    }
};


export default merge(commonConfig,config);
