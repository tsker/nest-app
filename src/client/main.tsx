import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './@servers';

import createStore from './@store';
import App from './app';

const store = createStore(window['__redux_data__']);
const mainNode = document.getElementById('main');

function bootstrap(Component) {
	let app = (
		<Provider store={store}>
			<Component />
		</Provider>
	);

	// =================== dev ================
	if (process.env.NODE_ENV === 'development') {
		let { AppContainer } = require('react-hot-loader');
		app = (
			<AppContainer warnings={false}>
				<Provider store={store}>
					<Component />
				</Provider>
			</AppContainer>
		);
	}

	render(app, mainNode);
}

if (module.hot) {
	module.hot.accept('./app', () =>
		import('./app').then((a) => {
			bootstrap(a.default);
		})
	);
}

bootstrap(App);
