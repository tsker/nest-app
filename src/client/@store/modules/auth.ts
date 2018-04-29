import { from, of } from 'rxjs';
import { login } from '@servers/auth';
import { compose } from 'redux';
import { emptyActon } from '@store/common/actions';
import { map, catchError, switchMap } from 'rxjs/operators';

const LOGIN = `AUTH/LOGIN`;
const LOGIN_SUCCESS = `AUTH/LOGIN_SUCCESS`;
const LOGIN_FAILD = `AUTH/LOGIN_FAILD`;
const LOGOUT = `AUTH/LOGOUT`;

const init = {
	user: {},
	logined: false,
	logining: false
};

export function reducer(state = init, action) {
	let { type, payload } = action;
	switch (type) {
		case LOGIN:
			return {
				...state,
				logining: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				logined: true,
				logining: false
			};
		case LOGIN_FAILD:
			return {
				...state,
				...payload,
				logining: false
			};
		case LOGOUT:
			return init;
		default:
			return state;
	}
}

export const actions = {
	login(user) {
		return { type: LOGIN, payload: { user } };
	},
	loginSuccess(user) {
		return { type: LOGIN_SUCCESS, payload: { user } };
	},
	loginFaild({ message }) {
		return { type: LOGIN_FAILD, payload: { error: message } };
	},
	logout() {
		return { type: LOGOUT };
	}
};

const effect = {
	cacheAuth(user) {
		localStorage.auth = JSON.stringify({ user, logined: true });
		return user;
	},
	clearAuth(arg) {
		localStorage.removeItem('auth');
		return arg;
	}
};

const loginEpic = (action$, store) => {
	return action$
		.ofType(LOGIN)
		.pipe(
			switchMap((act: any) =>
				from(login(act.payload.user)).pipe(
					map(effect.cacheAuth),
					map(actions.loginSuccess),
					catchError(compose((err: any) => of(actions.loginFaild(err)), effect.clearAuth))
				)
			)
		);
};

const logoutEpic = (action$) => action$.ofType(LOGOUT).pipe(map(effect.clearAuth), map(emptyActon));

export const epics = [ loginEpic, logoutEpic ];
