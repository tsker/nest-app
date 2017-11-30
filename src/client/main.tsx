import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './@servers';

import createStore from './@store';
import { App } from './app';

const store = createStore(window['__redux_data__']);
const mainNode = document.getElementById('main');

function bootstrap() {
	let app = (
		<Provider store={store}>
			<App />
		</Provider>
	);

	// =================== dev ================
	if (process.env.NODE_ENV === 'development') {
		let { AppContainer } = require('react-hot-loader');
		app = (
			<AppContainer warnings={false}>
				<Provider store={store}>
					<App />
				</Provider>
			</AppContainer>
		);
	}

	render(app, mainNode);
}

if (process.env.NODE_ENV === 'development') {
	module.hot.accept('./app', () => import('./app').then(bootstrap));
}


bootstrap()