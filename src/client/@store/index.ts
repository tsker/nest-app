import { createStore, applyMiddleware, compose, Store, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import modules from './modules';
let globalStore: LifeStore;

export function injectModule(key, { reducer, epics }, dep = {}) {
	let { injectReducers: reducers, epics$ } = globalStore;

	if (reducers[key]) return console.warn(`${key} mod exist!!!`);

	console.group(`${key} module is loaded!`);
	if (reducer) {
		reducers[key] = reducer;
		globalStore.replaceReducer(combineReducers(reducers));
		console.log(`${key} reducer is loaded!`);
	}

	if (epics) {
		epics.map((epic) => epics$.next(epic));
		console.log(`${key} Epic is loaded!`);
	}
	console.groupEnd()
}

interface LifeStore extends Store<{}> {
	injectReducers?: any;
	epics$?: any;
	epicsDep?: any;
}
export default function create(data = {}): LifeStore {
	if (globalStore) return globalStore;

	// combine
	let rootEpics = combineEpics(...modules.epics);
	let rootReducers = combineReducers(modules.reducers);

	// epics middle
	let behaviorEpics$ = new BehaviorSubject(rootEpics);
	let rootEpics$ = (actions$, store) => behaviorEpics$.mergeMap((epic) => epic(actions$, store, {}));
	let epicMiddle = createEpicMiddleware(rootEpics$);

	// middles & enhancers
	const middles = [ epicMiddle ];
	const enhanncers = [ applyMiddleware(...middles) ];

	// devtool
	let composeEnhancers = compose;
	if (process.env.NODE_ENV !== 'production') {
		composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
	}

	// create store
	globalStore = createStore(rootReducers, data, composeEnhancers(...enhanncers));

	// cache store
	globalStore.injectReducers = { ...modules.reducers };
	globalStore.epics$ = behaviorEpics$;
	globalStore.epicsDep = {};

	// return
	return globalStore;
}
