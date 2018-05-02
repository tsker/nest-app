import * as path from 'path';
import * as fs from 'fs';

export const development = process.env.NODE_ENV === 'development';
export const clientDevPath = path.resolve(__dirname, '../src/client');
export const tsconfigFile = path.resolve(clientDevPath, 'tsconfig.json');
export const distPath = `${__dirname}/../dist/client`;
export const resolve = p => path.resolve(clientDevPath, p);
export const aliasDir = fs
    .readdirSync(clientDevPath)
    .filter(dir => /^@/.test(dir))
    .reduce((l, dir) => {
        l[dir] = resolve(dir);
        return l;
    }, {});

export const main = development
    ? ['react-hot-loader/patch', 'webpack-hot-middleware/client', resolve('main.tsx')]
    : resolve('main.tsx');

export const jsFilename = development ? 'js/[name].js' : 'js/[name].[chunkhash].js';

export const loaders = {
    ts: {
        loader: 'ts-loader',
        options: { configFile: tsconfigFile }
    },
    lazy: 'bundle-loader?lazy',
    hot: 'react-hot-loader/webpack',
    less: 'less-loader',
    css: 'css-loader',
    style: 'style-loader',
    url: 'url-loader'
};

let packageDep = {
    // moment: { map: 'window.moment', url: 'https://unpkg.com/moment@2.20.1/min/moment.min.js' },
    // momentlocale: { map: 'window.momentlocale', url: 'https://unpkg.com/moment@2.20.1/locale/zh-cn.js' },
    react: { map: 'window.React', url: 'https://unpkg.com/react@16.1.1/umd/react.production.min.js' },
    redux: { map: 'window.Redux', url: 'https://unpkg.com/redux@3.7.2/dist/redux.min.js' },
    'react-dom': { map: 'window.ReactDOM', url: 'https://unpkg.com/react-dom@16.1.1/umd/react-dom.production.min.js' },
    'react-redux': { map: 'window.ReactRedux', url: 'https://unpkg.com/react-redux@5.0.6/dist/react-redux.min.js' },
    'react-router-dom': {
        map: 'window.ReactRouterDOM',
        url: 'https://unpkg.com/react-router-dom@4.2.2/umd/react-router-dom.min.js'
    }
};

export const injectPackageToWidow = (function() {
    let inject = { externals: {}, templateJss: '' };
    if (development) return inject;

    return Object.keys(packageDep).reduce((packages, key) => {
        let { map, url } = packageDep[key];
        packages.externals[key] = map;
        packages.templateJss += `<script src='${url}'></script>`;
        return packages;
    }, inject);
})();
