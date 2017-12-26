import * as React from 'react';
import * as cls from 'classnames';
import './index.less';
import { renderSafeOptions } from '@components/util';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
	options?: any[] | Object;
}

export class Select extends React.Component<SelectProps> {
	renderOption(props) {
		let { text, value, ...rest } = props;
		if (typeof props !== 'object') {
			text = value = props;
		}

		return (
			<option value={value} key={value} {...rest}>
				{text}
			</option>
		);
	}

	render() {
		let { className, options, ...rest } = this.props;
		let props: any = {};
		if (options) {
			props.children = renderSafeOptions(this.renderOption, options);
		}

		return <select {...rest} {...props} className={cls('select', className)} />;
	}
}
