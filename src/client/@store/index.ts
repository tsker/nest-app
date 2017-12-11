import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { reducers, epics } from './modules';

export default function create(data = {}) {
	let devtool = () => (v) => v;
	if (process.env.NODE_ENV !== 'production') {
		devtool = window['__REDUX_DEVTOOLS_EXTENSION__'] || devtool;
	}

	const middles = [ createEpicMiddleware(epics) ];
	const enhanncers = [ applyMiddleware(...middles), devtool() ];

	return createStore(reducers, data, compose(...enhanncers));
}
