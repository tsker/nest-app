import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import * as auth from './auth';
import * as counter from './counter';
import * as githubUsers from './github-users';

export const reducers = combineReducers({
	auth: auth.reducer,
	counter: counter.reducer,
	githubUsers: githubUsers.reducer
});

export const epics = combineEpics(...counter.epics, ...githubUsers.epics, ...auth.epics);
