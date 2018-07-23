import * as fs from 'fs';
import * as path from 'path';
import { renderToString } from 'react-dom/server';

import ssr from '../../client/ssr';
import createStore from '../../client/@store/index';

// todo - cache
const template = fs
    .readFileSync(path.resolve(__dirname, '../../../dist/client/index.html'))
    .toString();

export default function (req: Request, newState: any) {
    let { url } = req;
    const context = {};

    const store = createStore(newState);
    const pageTpl = renderToString(ssr(url, context, store));
    const pageData = `<script>window.__redux_data__ = ${JSON.stringify(store.getState())}</script>`
    const page = template.replace(/(\<div\s+id\="main"\>)(.|\n|\r)*(\<\/div\>)/i,  `$1${pageTpl}$3${pageData}`);
    console.log(url, context);

    return page
}
