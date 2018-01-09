import * as React from 'react';
import * as cls from 'classnames';
import * as moment from 'moment';
import * as range from 'lodash/range';
import * as noop from 'lodash/noop';
import * as upperFirst from 'lodash/upperFirst';
import * as difference from 'lodash/difference';
import { eachBind, hasValue } from '../util';
import { Select } from '..';
import { DateTypes } from '../util/types';
import './index.less';

export interface TimerProps {
	value?: DateTypes;
	defaultValue?: DateTypes;

	className?: string;
	onChange?: any;
	disabled?: boolean;
	hiddenDisable?: boolean;

	hours?: string[] | number[] | false;
	minutes?: string[] | number[] | false;
	seconds?: string[] | number[] | false;
	disabledHours?: any[];
	disabledMinutes?: any[];
	disabledSeconds?: any[];
}
interface TimerState {
	value: moment.Moment;
}

export class Timer extends React.PureComponent<TimerProps, TimerState> {
	public static defaultProps = {
		hours: range(0, 24),
		minutes: range(0, 60, 5),
		seconds: false,
		defaultValue: moment(),
		onChange: noop
	};
	constructor(p) {
		super(p);
		let value = p.value || p.defaultValue;
		this.state = { value };
		eachBind([ 'handleChange' ], this);
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps)) {
			this.setState({ value: nextProps.value });
		}
	}

	handleChange(e) {
		let newValue = this.state.value.clone();
		let { value, name } = e.target;
		newValue[name](value);
		if (!hasValue(this.props)) {
			this.setState({ value: newValue });
		}
		this.props.onChange(newValue);
	}

	renderCell(type: string) {
		let { props } = this;
		let { value } = this.state;

		let options = props[type],
			disableds = props['disabled' + upperFirst(type)];
		if (!options) {
			return null;
		}

		options = props.hiddenDisable ? { options: difference(options, disableds) } : { options, disableds };

		return (
			<Select
				{...options}
				name={type}
				value={value[type]()}
				disabled={props.disabled}
				onChange={this.handleChange}
			/>
		);
	}

	render() {
		let { className } = this.props;
		let { value } = this.state;
		return (
			<div className={cls('timer', className)}>
				{this.renderCell('hours')}
				{this.renderCell('minutes')}
				{this.renderCell('seconds')}
			</div>
		);
	}
}
