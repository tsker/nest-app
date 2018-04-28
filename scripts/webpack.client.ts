import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as Html from 'html-webpack-plugin';
import { exec } from 'child_process';
import { compose } from 'redux';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const Extract = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

import {
    development,
    clientDevPath,
    resolve,
    distPath,
    aliasDir,
    tsconfigFile,
    main,
    jsFilename,
    vendor,
    loaders,
    injectPackageToWidow
} from './options';

console.log('webpack env::', process.env.NODE_ENV);
!development && exec(`rm -r ${distPath}`);

const config: any = {
    mode:'development',
    devtool: 'source-map',
    entry: development ? { main } : { main, vendor },
    output: {
        path: distPath,
        filename: jsFilename,
        publicPath: '/',
        chunkFilename: jsFilename
    },
    externals: injectPackageToWidow.externals,
    resolve: {
        alias: aliasDir,
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.less', '.css']
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
            },
            {
                test: /\.less$/,
                use: development
                    ? [loaders.style, loaders.css, loaders.less]
                    : Extract.extract({
                          use: ['css-loader', 'less-loader'],
                          fallback: 'style-loader'
                      })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: loaders.url,
                include: clientDevPath,
                options: {
                    limit: 10,
                    name: 'img/[name].[ext]'
                }
            }
        ].filter(Boolean)
    },
    plugins: [
        new webpack.EnvironmentPlugin({ NODE_ENV: process.env.NODE_ENV }),
        new ForkTsCheckerWebpackPlugin({ tsconfig: tsconfigFile }),
        new Html({
            template: resolve('index.html'),
            filename: development ? 'index.html' : 'app/index.html', //output
            inject: 'body',
            __js: injectPackageToWidow.templateJss,
            minify: {
                minifyCSS: true,
                minifyJS: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        development ? new webpack.optimize.ModuleConcatenationPlugin() : null,
        development ? new webpack.NamedModulesPlugin() : null,
        development ? new webpack.HotModuleReplacementPlugin() : null,
        development ? new webpack.NoEmitOnErrorsPlugin() : null,

        development ? null : new webpack.HashedModuleIdsPlugin(),
        development ? null : new webpack.optimize.OccurrenceOrderPlugin(false),
        development ? null : new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        development ? null : new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
        development ? null : new webpack.optimize.ModuleConcatenationPlugin(),
        development ? null : new BundleAnalyzerPlugin(),
        development
            ? null
            : new Extract({
                  filename: 'index-[chunkhash:8].css',
                  disable: false,
                  allChunks: true
              }),
        development
            ? null
            : new Uglify({
                  uglifyOptions: {
                      compress: { warnings: false },
                      comments: false
                  }
              })
    ].filter(Boolean),
    devServer: development ? { hot: true, historyApiFallback: true } : {}
};

export default config;
