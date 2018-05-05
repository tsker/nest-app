import * as classnames from 'classnames';

const plugins = {
	size(prefix, param) {},
	disabled(prefix, param) {}
};

interface enhancedClassnameOpts {
	attrs?: string[];
	props?: any;
	prefix?: boolean;
}

export function enhancedClassname(prefix: string, { attrs = [], props }: enhancedClassnameOpts) {
	let cls = attrs.map((key) => {
		let plugin = plugins[key];
		let prop = props[key];

		if (prop && plugin) {
			return plugin(prefix, prop);
		}
	});

	return classnames(props.prefix && prefix, cls, props.className);
}
