import { toType } from '@components/util';

export function transformOptions(o, values) {
	let __options: any = [],
		__caches = {};
	function makeOption(option: any, _index) {
		if (toType(option) !== 'object') {
			option = { text: option };
		}

		let { text, children = text, value = children, filter = text || value, ...props } = option.props || option;
		value += '';
		filter = ('' + filter).toLowerCase();

		let checked = values.indexOf(value) > -1;
		let newOption = { ...props, children, value, checked, filter, _index };
		if (checked) {
			__caches[value] = newOption;
		}

		return newOption;
	}
	switch (toType(o)) {
		case 'object':
			__options = Object.keys(o).map((value, i) => makeOption({ text: o[value], value }, i));
			break;
		case 'array':
			__options = o.map(makeOption);
			break;
	}

	return { __options, __caches };
}
