import { timer } from 'rxjs';
import { fetchSearchUsers } from '@servers/github';
import { mergeMap, map, filter, switchMap } from 'rxjs/operators';

const SEARCH_USERS = `GITHUB-USER/SEARCH_USERS`;
const RECEIVE_USERS = `GITHUB-USER/RECEIVE_USERS`;

const init = {
	users: []
};

export function reducer(state = init, action) {
	let { type, payload } = action;
	switch (type) {
		case RECEIVE_USERS:
			return { ...payload };
		case SEARCH_USERS:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}

export const actions = {
	searchUsers(query) {
		return { type: SEARCH_USERS, payload: { query } };
	},
	receiveUsers(users) {
		return { type: RECEIVE_USERS, payload: { users } };
	}
};

const searchUsersEpic = (action$) =>
	action$
		.ofType(SEARCH_USERS)
		.pipe(
			map((act: any) => act.payload.query),
			filter(Boolean),
			switchMap((q) =>
				timer(800).pipe(
					mergeMap(() => fetchSearchUsers(q)),
					map((data) => data['items']),
					map(actions.receiveUsers)
				)
			)
		);

export const epics = [ searchUsersEpic ];
