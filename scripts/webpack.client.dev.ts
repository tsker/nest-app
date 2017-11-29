import * as webpack from 'webpack';

import { paths, loaders, commonConfig, plugins } from './webpack.common';

const config: any = {
    devtool: 'source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            `${paths.clientDevPath}/main.tsx`,
            'webpack-hot-middleware/client?timeout=2000&overlay=false'
        ]
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
		new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
		...plugins
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    }
};

export default Object.assign(commonConfig,config);
