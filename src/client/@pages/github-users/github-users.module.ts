import { Observable } from 'rxjs';
import { fetchSearchUsers } from '@servers/github';

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
		.map((act) => act.payload.query)
		.filter((q) => !!q)
		.switchMap((q) =>
			Observable.timer(800)
				.mergeMap(() => fetchSearchUsers(q))
				.map((data) => data['items'])
				.map(actions.receiveUsers)
		);

export const epics = [ searchUsersEpic ];
