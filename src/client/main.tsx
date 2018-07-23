import { createElement } from 'react';
import { render, hydrate } from 'react-dom';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import './@servers';

import createStore from './@store';
import App from './app';

const store = createStore(window['__redux_data__']);
const mainNode = document.getElementById('main');

function bootstrap (Component) {
    // const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;
    const baseUrl = '/render';

    let app = (
        <Provider store={store}>
            <Router basename={baseUrl}>
                <Component />
            </Router>
        </Provider>
    );

    if (process.env.NODE_ENV === 'development') {
        let { AppContainer } = require('react-hot-loader');
        app = (
            <AppContainer warnings={false}>
                <Provider store={store}>
                    <Router basename={baseUrl}>
                        <Component />
                    </Router>
                </Provider>
            </AppContainer>
        );
    }

    hydrate(app, mainNode);
}

if (module.hot && process.env.NODE_ENV !== 'production') {
    console.log('env:: ', process.env.NODE_ENV);

    module.hot.accept('./app', () =>
        import('./app').then((a) => {
            bootstrap(a.default);
        })
    );

    module.hot.accept('./@store/modules', () =>
        import('./@store/modules').then((a) => {
            store.replaceReducer(combineReducers(store.injectReducers));
        })
    );
}

bootstrap(App);
