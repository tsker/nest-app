import * as React from 'react';
import * as cls from 'classnames';
import * as moment from 'moment';
import * as range from 'lodash/range';
import * as noop from 'lodash/noop';
import { eachBind, toType, hasValue } from '../util';
import { Select, Timer, TimerProps } from '..';
import './calendar.less';

import { CalendarHeader } from './header';

window['e'] = moment;

interface CalendarProps {
	className?: string;
	weeks?: string[];

	value?: moment.Moment;
	defaultValue?: moment.Moment;
	view?: moment.Moment;

	onChange?: any;
	timerOption?: TimerProps;
}
interface CalendarState {
	value: moment.Moment;
	view: moment.Moment;
}

export class Calendar extends React.PureComponent<CalendarProps, CalendarState> {
	years: number[];
	public static months = range(1, 13);

	public static defaultProps = {
		weeks: [ '一', '二', '三', '四', '五', '六', '日' ],
		defaultValue: moment(),
		onChange: noop
	};
	constructor(p) {
		super(p);
		let value = p.value || p.defaultValue;
		let view = p.view || value;
		this.state = { value, view };
		this.years = range(value.year() - 5, value.year() + 5);
		eachBind([ 'handleChange', 'handleViewChange', 'handleDateChange' ], this);
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps)) {
			this.setState({ value: nextProps.value });
		}
	}

	handleViewChange(e) {
		let view = this.state.view.clone();
		let { name, value, dataset } = e.target;

		if (value) {
			view[name](value - 1);
		} else {
			console.log(dataset);
			view.add(dataset.step, dataset.name);
		}
		this.setState({ view });
	}

	handleChange(value) {
		if (!hasValue(this.props)) {
			this.setState({ value });
		}
		this.props.onChange(value);
	}

	handleDateChange(e) {
		let view = this.state.view.clone();
		view.date(e.target.dataset.value);
		this.handleChange(view);
	}

	renderDay() {
		let { value, view } = this.state;
		let today = moment();

		return range(1, view.daysInMonth() + 1).map((day) => {
			let date = view.clone().date(day);
			let classname = cls({ today: date.isSame(today, 'date'), current: date.isSame(value, 'date') });
			return (
				<li key={'day' + day}>
					<span data-value={day} className={classname} onClick={this.handleDateChange}>
						{day}
					</span>
				</li>
			);
		});
	}
	renderWeek() {
		let { weeks } = this.props;
		return weeks!.map((w) => <li key={w}>{w}</li>);
	}
	renderEmptyDay() {
		let firstDayWeek = this.state.view.clone().startOf('month').day() || 7;
		return range(1, firstDayWeek).map((e, i) => (
			<li key={i}>
				<span />
			</li>
		));
	}

	render() {
		let { value, view } = this.state;
		let { timerOption, className } = this.props;

		return (
			<div className={cls('calendar', className)}>
				<CalendarHeader view={view} years={this.years} onViewChange={this.handleViewChange} />
				<div className="body">
					<ul className="weeks">{this.renderWeek()}</ul>
					<ul className="days">
						{this.renderEmptyDay()}
						{this.renderDay()}
					</ul>
				</div>
				<div className="footer">
					<Timer {...timerOption} value={value} onChange={this.handleChange} />
				</div>
			</div>
		);
	}
}
