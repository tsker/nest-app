import { Observable } from 'rxjs';

const INC = `COUNTER/INC`;
const DEC = `COUNTER/DEC`;
const ASYNC_INC = `COUNTER/ASYNC_INC`;
const ASYNC_DEC = `COUNTER/ASYNC_DEC`;

const init = 0;

export function reducer(state = init, action) {
    switch (action.type) {
        case INC:
            return state + 1;
        case DEC:
            return state - 1;
        default:
            return state;
    }
}

export const actions = {
    inc() {
        return { type: INC };
    },
    dec() {
        return { type: DEC };
    },
    async_inc() {
        return { type: ASYNC_INC };
    },
    async_dec() {
        return { type: ASYNC_DEC };
    }
};

const asyncIncEpic = action$ =>
    action$
        .ofType(ASYNC_INC)
        .mergeMap(e => Observable.of(e).delay(1000))
        .map(e => ({ type: INC }));

const asyncDecEpic = action$ =>
    action$
        .ofType(ASYNC_DEC)
        .mergeMap(e => Observable.of(e).delay(1000))
        .map(e => ({ type: INC }));

export const epics = [asyncIncEpic, asyncDecEpic];
