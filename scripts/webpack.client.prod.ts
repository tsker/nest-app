import * as webpack from 'webpack';
import * as Html from 'html-webpack-plugin';
import * as Extract from 'extract-text-webpack-plugin';
const Uglify = require('uglifyjs-webpack-plugin')

import { paths, loaders, commonConfig,plugins } from './webpack.common';


const config: any = {
    entry: {
        main: `${paths.clientDevPath}/main.tsx`,
        vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'redux',
            'react-redux'
        ]
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
                use: [loaders.ts],
                exclude: /node_modules/
            },
            {
                test: /\.async\.tsx?$/,
                use: [loaders.lazy, loaders.ts],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        ...plugins,
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(false),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
        new Uglify({
            uglifyOptions: {
                compress: { warnings: false },
                comments: false
            }
        })
    ]
};

export default Object.assign(commonConfig,config);
