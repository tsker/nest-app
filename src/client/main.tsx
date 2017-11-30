import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './@servers'

import createStore from './@store';
import { App } from './app';

const store = createStore(window['__redux_data__']);
const mainNode = document.getElementById('main');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	mainNode
);

if (module.hot) {
	module.hot.accept('./app', function() {
		import('./app').then(({ App }) => {
			render(
				<Provider store={store}>
					<App />
				</Provider>,
				mainNode
			);
		});
	});
}
