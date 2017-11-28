export const namespace = 'counter';

export const action_type = {
	inc: `${namespace}/inc`,
	dec: `${namespace}/dec`
};

const init = 0;

export default function reducer(state = init, action) {
	switch (action.type) {
		case action_type.inc:
			return state + 1;
		case action_type.inc:
			return state - 1;
		default:
			return state;
	}
}

export const actions = {
	inc() {
		return { type: action_type.inc };
	},
	dec() {
		return { type: action_type.dec };
	}
};
