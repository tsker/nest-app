import { createElement } from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { JSDOM } from 'jsdom';

import App from './app';

declare global {
    namespace NodeJS {
        interface Global {
            window: Window;
            document: Document;
            navigator: Navigator;
        }
    }
}

if (typeof window === 'undefined') {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.navigator
}

export default (url: string | object, context: any, store: any) => {
    return (
        <Provider store={store}>
            <StaticRouter location={url} context={context} basename='/render'>
                <App />
            </StaticRouter>
        </Provider>
    );
};
