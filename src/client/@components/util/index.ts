export function bindAll(context, ...fns) {
	function bind(fn) {
		context[fn] = context[fn].bind(context);
	}

	fns.forEach(bind);
}

export function noop() {}

export function pull(array, ...rest) {
	let values = new Set(rest);
	return array.filter((item) => !values.has(item));
}
