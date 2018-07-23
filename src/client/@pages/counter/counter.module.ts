import { interval } from 'rxjs';
import { takeUntil, map, delay, switchMap } from 'rxjs/operators';

const INC = `COUNTER/INC`;
const DEC = `COUNTER/DEC`;
const ASYNC_INC = `COUNTER/ASYNC_INC`;
const ASYNC_DEC = `COUNTER/ASYNC_DEC`;
const INTERVAL_INC = `COUNTER/INTERVAL_INC`;

const init = 0;

export function reducer (state = init, action) {
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
    inc () {
        return { type: INC };
    },
    dec () {
        return { type: DEC };
    },
    asyncInc () {
        return { type: ASYNC_INC };
    },
    asyncDec () {
        return { type: ASYNC_DEC };
    },
    intervalInc () {
        return { type: INTERVAL_INC };
    }
};

const asyncIncEpic = (action$) => action$.ofType(ASYNC_INC).pipe(delay(1000), map(actions.inc));

const asyncDecEpic = (action$) => action$.ofType(ASYNC_DEC).pipe(delay(1000), map(actions.dec));

const intervalIncEpic = (action$) =>
    action$
        .ofType(INTERVAL_INC)
        .pipe(
            switchMap((e) =>
                interval(1000).pipe(takeUntil(action$.ofType(ASYNC_DEC, DEC)), map(actions.inc))
            )
        );

export const epics = [ asyncIncEpic, asyncDecEpic, intervalIncEpic ];
