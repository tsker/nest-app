import * as React from 'react';
import * as cls from 'classnames';
import * as range from 'lodash/range';
import * as noop from 'lodash/noop';
import * as upperFirst from 'lodash/upperFirst';
import * as moment from 'moment';
import { safeMoment, eachBind, hasValue } from '../util';
import { Select } from '..';
import './index.less';

type TimerList = string[] | number[];
export interface TimerProps {
	format?: string;
	className?: string;
	value?: moment.Moment;
	defaultValue?: moment.Moment;
	onChange?: any;
	disabled?: boolean;

	hours?: TimerList | false;
	minutes?: TimerList | false;
	seconds?: TimerList | false;
	disabledHours?: any[];
	disabledMinutes?: any[];
	disabledSeconds?: any[];
}
interface TimerState {
	value: moment.Moment;
}

export class Timer extends React.PureComponent<TimerProps, TimerState> {
	public static defaultProps = {
		format: 'HH:mm:ss',
		defaultValue: moment(),
		hours: range(0, 24),
		minutes: range(0, 60),
		seconds: range(0, 60),
		onChange: noop
	};
	constructor(p) {
		super(p);
		let value = safeMoment(p.value || p.defaultValue);
		this.state = { value };
		eachBind([ 'handleChange' ], this);
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps)) {
			this.setState({
				value: safeMoment(nextProps.value)
			});
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

		let options = props[type];
		if (!options) {
			return null;
		}
		return (
			<Select
				disabled={props.disabled}
				name={type}
				options={options}
				value={value[type]()}
				disableds={props['disabled' + upperFirst(type)]}
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
