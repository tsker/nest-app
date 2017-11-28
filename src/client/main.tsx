import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app';

let mainNode = document.getElementById('main');
render(<App />, mainNode);

if (module.hot) {
	module.hot.accept('./app', function() {
		import('./app').then(({ App }) => {
			render(<App />, mainNode);
		});
	});
}
