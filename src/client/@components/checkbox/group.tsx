import * as React from 'react';
import * as cls from 'classnames';
import { Checkbox } from './checkbox';
import { renderSafeOptions, eachBind } from '@components/util';

interface CheckboxGroupProps {
	options?: any[] | Object;
	className?: 'string';
	onChange?: any;
	value?: string[];
	defaultValue?: string[];
}
interface CheckboxGroupState {
	value: string[];
}
export class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
	public static defaultProps = {
		defaultValue: []
	};

	constructor(p) {
		super(p);
		this.state = {
			value: p.value || p.defaultValue
		};

		eachBind([ 'handleChange', 'renderCheckbox' ], this);
	}

	componentWillReceiveProps({ value }) {
		if (value !== undefined && value.toString() !== this.state.value.toString()) {
			this.setState({ value });
		}
	}

	handleChange(e) {
		let { checked, value } = e.target;
		let selects = [ ...this.state.value ];
		let { onChange } = this.props;
		if (checked) {
			selects = selects.concat(value);
		} else {
			let index = selects.findIndex((box) => box === value);
			selects.splice(index, 1);
		}

		let hasValueInProps = 'value' in this.props;
		if (!hasValueInProps) {
			this.setState({ value: selects });
		}
		onChange && onChange(selects);
	}

	renderCheckbox(props) {
		let { text, value, ...rest } = props;
		if (typeof props !== 'object') {
			text = value = props;
		}
		let checked = this.state.value.indexOf(value) > -1;

		return (
			<Checkbox
				key={value}
				value={value}
				checked={checked}
				onChange={this.handleChange}
				{...rest}
			>
				{text}
			</Checkbox>
		);
	}

	render() {
		let { className, options } = this.props;
		let props: any = {};
		if (options) {
			props.children = renderSafeOptions(this.renderCheckbox, options);
		}
		return <div className={cls('checkbox-group', className)} {...props} />;
	}
}
