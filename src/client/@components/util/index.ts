import * as pick from 'lodash/pick';

export function renderSafeOptions(component, options) {
	let type = Object.prototype.toString.call(options);
	if (type === '[object Object]') {
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
