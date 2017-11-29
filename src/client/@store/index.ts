import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { reducers, epics } from './modules';

export default function create(data = {}) {
    const middles = [createEpicMiddleware(epics)];

    return createStore(reducers, data, applyMiddleware(...middles));
}
