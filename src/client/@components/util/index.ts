import * as pick from 'lodash/pick';
import * as curry from 'lodash/curry';
import * as moment from 'moment';

export function renderSafeOptions(component, options) {
	if (toType(options) === 'object') {
		return Object.keys(options).map((value) => {
			return component({ text: options[value], value });
		});
	} else {
		return options.map(component);
	}
}

export function createNode(tag: string = 'div'): HTMLElement {
	let node = document.createElement(tag);
	document.body.appendChild(node);
	return node;
}

export function toType(o): string {
	return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

export function eachBind(fns, o) {
	fns.forEach((fn) => {
		o[fn] = o[fn].bind(o);
	});
}

let uid = Date.now();
export function nextUid() {
	return (uid++).toString(36);
}

export function containerNode(l, r) {
	return l === r || l.contains(r);
}

export function compareObjWithKey(o1: object, o2: object, keys: string[]) {
	for (let key of keys) {
		if (o1[key] !== o2[key]) return false;
	}
	return true;
}

export function hasKey(key: string, o: object) {
	return key in o;
}

export const hasValue: (o: object) => boolean = curry(hasKey)('value');
