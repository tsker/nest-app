import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app';

render(<App />, document.getElementById('main'));











declare const module: {
	hot: any;
};


if (module.hot) {
	module.hot.accept('./app', function() {
		render(<App />, document.getElementById('main'));
	});
}
