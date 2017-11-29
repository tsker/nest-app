import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import * as counter from './counter';

export const reducers = combineReducers({
    counter: counter.reducer
});

export const epics = combineEpics(...counter.epics);
