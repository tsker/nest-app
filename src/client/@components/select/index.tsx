import * as React from 'react';
import * as cls from 'classnames';
import './index.less';
import { renderSafeOptions, toType, eachBind } from '../util';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
	options?: any[] | Object;
	disableds?: any[];
}

export class Select extends React.PureComponent<SelectProps> {
	constructor(p) {
		super(p);
		eachBind([ 'renderOption' ], this);
	}
	renderOption(props) {
		if (toType(props).match(/string|number/)) {
			props = {
				text: props,
				value: props
			};
		}

		let { disableds } = this.props;
		let { text, value, ...rest } = props;

		if (disableds) {
			rest.disabled = disableds.indexOf(value) > -1;
		}

		return (
			<option value={value} key={value} {...rest}>
				{text}
			</option>
		);
	}

	render() {
		let { className, options, disableds, ...rest } = this.props;
		let props: any = {};
		if (options) {
			props.children = renderSafeOptions(this.renderOption, options);
		}

		return <select {...rest} {...props} className={cls('select', className)} />;
	}
}
