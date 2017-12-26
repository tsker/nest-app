import * as React from 'react';
import * as cls from 'classnames';
import { Radio } from './radio';
import { renderSafeOptions, eachBind } from '@components/util';

interface RadioGroupProps {
	options?: any[] | Object;
	className?: 'string';
	onChange?: any;
	value?: string;
	defaultValue?: string;
}
interface RadioGroupState {
	value: string;
}
export class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
	public static defaultProps = {
		defaultValue: ''
	};

	constructor(p) {
		super(p);
		this.state = {
			value: p.value || p.defaultValue
		};
		eachBind([ 'handleChange', 'renderRadio' ], this);
	}

	componentWillReceiveProps({ value }) {
		if (value !== undefined && value !== this.state.value) {
			this.setState({ value });
		}
	}

	handleChange(e) {
		let { checked, value } = e.target;
		let { onChange } = this.props;

		let hasValueInProps = 'value' in this.props;
		if (!hasValueInProps) {
			this.setState({ value });
		}
		onChange && onChange(value);
	}

	renderRadio(props) {
		let { text, value, ...rest } = props;
		if (typeof props !== 'object') {
			text = value = props;
		}
		let checked = this.state.value === value;

		return (
			<Radio
				key={value}
				value={value}
				checked={checked}
				onChange={this.handleChange}
				{...rest}
			>
				{text}
			</Radio>
		);
	}

	render() {
		let { className, options } = this.props;
		let props: any = {};
		if (options) {
			props.children = renderSafeOptions(this.renderRadio, options);
		}
		return <div className={cls('radio-group', className)} {...props} />;
	}
}
