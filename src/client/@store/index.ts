import { createStore } from 'redux';

import reducers from './modules/reducers';

export default function create(data = {}) {
	return createStore(reducers, data);
}
