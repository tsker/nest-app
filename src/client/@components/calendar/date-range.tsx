import * as React from 'react';
import * as cls from 'classnames';
import * as moment from 'moment';
import * as range from 'lodash/range';
import * as noop from 'lodash/noop';
import { eachBind, toType, hasValue, exchangeMoment } from '../util';
import { Select, Timer, TimerProps } from '..';
import { Calendar } from './calendar';
import { now } from './util';
import './date-range.less';

enum LR {
	left,
	right
}

interface DateRangeProps {
	value?: moment.Moment[];
	defaultValue?: moment.Moment[];
	onChange?: any;
}
interface DateRangeState {
	selectValue: moment.Moment[];
	hoverValue: undefined | moment.Moment;
	views: moment.Moment[];
}

export class DateRange extends React.PureComponent<DateRangeProps, DateRangeState> {
	public static defaultProps = {
		onChange: noop
	};
	constructor(p) {
		super(p);
		this.state = {
			selectValue: p.value || p.defaultValue || [],
			hoverValue: undefined,
			views: [ now, now.clone().add(1, 'months') ]
		};
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps)) {
			this.setState({ selectValue: nextProps.value, hoverValue: undefined });
		}
	}
	handleViewChange = (dir, v) => {
		let views = [ ...this.state.views ];
		views[LR[dir]] = v;
		this.setState({ views });
	};

	handleChange = (v, dir?) => {
		let value = this.state.selectValue.slice();
		let { onChange, ...props } = this.props;

		if (dir) {
			value[LR[dir]] = v;
		} else {
			value = value.length === 1 ? value.concat(v) : [ v ];
		}

		if (value.length === 2 && hasValue(props)) {
			onChange(value);
		} else {
			this.setState({ selectValue: value, hoverValue: undefined });
		}
	};
	handleHover = (hoverValue) => {
		let { length } = this.state.selectValue;
		if (length === 1) this.setState({ hoverValue });
	};

	getCalendarProps(dir, { arrow, ...rest }) {
		let { views, selectValue, hoverValue } = this.state;
		let index = LR[dir];
		let rever = LR[+!LR[dir]];
		return {
			dir,
			value: selectValue[index],
			view: views[index],

			selectValue,
			hoverValue,
			onHover: this.handleHover,
			onChange: this.handleChange,
			onViewChange: this.handleViewChange,
			[rever + 'Arrow']: arrow,
			...rest
		};
	}

	render() {
		let { views, selectValue, hoverValue } = this.state;
		let [ left, right ] = views;
		let arrow = left.isBefore(right.clone().add(-1, 'months'));
		let disabledDate = (date) => date.isBefore(left.clone().add(1, 'month'), 'month');

		return (
			<div className="date-range">
				<Calendar {...this.getCalendarProps('left', { arrow })} />
				<Calendar {...this.getCalendarProps('right', { arrow, disabledDate })} />
			</div>
		);
	}
}
