export * from './time-queue';

export function noop() {}

export function bindAll(context, ...fns) {
	function bind(fn) {
		context[fn] = context[fn].bind(context);
	}

	fns.forEach(bind);
}

export function pull(array, ...rest) {
	let values = new Set(rest);
	return array.filter((item) => !values.has(item));
}

export function pick(object, ...keys) {
	return keys.reduce((o, key) => (o[key] = object[key]), {});
}

export function delayFn(fn, ms = 200) {
	return function(...args) {
		clearTimeout(fn.timer);
		fn.timer = setTimeout(fn, ms, ...args);
	};
}

export function delay(ms) {
	return new Promise((ok) => setTimeout(ok, ms));
}

export function compose(...fns) {
	if (fns.length === 0) {
		return noop;
	}
	if (fns.length === 1) {
		return fns[0];
	}

	let first = fns.shift();

	return fns.reduce((result, fn) => (...params) => fn(result(...params)), first);
}

export function queue(...fns) {
	if (fns.length === 0) {
		throw new Error('must min have 1 params');
	}
	if (fns.length === 1) {
		return fns[0];
	}

	let last = fns.pop();

	return (arg) => fns.reduceRight((next, fn) => () => fn(arg, next), last)();
}

export function upperFirst(str: string){
    return str.replace(/^./, s => s.toUpperCase())
}