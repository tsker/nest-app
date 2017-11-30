import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import * as counter from './counter';
import * as githubUsers from './github-users';

export const reducers = combineReducers({
	counter: counter.reducer,
	githubUsers: githubUsers.reducer
});

export const epics = combineEpics(...counter.epics, ...githubUsers.epics);
