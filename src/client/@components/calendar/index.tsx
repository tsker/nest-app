import * as React from 'react';
import * as cls from 'classnames';
import * as moment from 'moment';
import * as range from 'lodash/range';
import * as noop from 'lodash/noop';
import { eachBind, toType, hasValue, safeMoment } from '../util';
import { Select, Timer, TimerProps } from '..';

import './index.less';
window['e'] = moment;

type CalendarValue = string | moment.Moment | Date;
interface CalendarProps {
	format?: string;
	className?: string;
	weeks?: string[];
	value?: CalendarValue;
	defaultValue?: CalendarValue;
	onChange?: any;
	DayComponent?: any;
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
		let value = safeMoment(p.value || p.defaultValue);
		this.state = { value, view: value };
		this.years = range(value.year() - 5, value.year() + 5);
		eachBind(
			[
				'handleChange',
				'handleYearChange',
				'handleMonthChange',
				'handleDateChange',
				'today',
				'nextMonth',
				'preMonth'
			],
			this
		);
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps)) {
			this.setState({
				value: safeMoment(nextProps.value)
			});
		}
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

	handleChange(value) {
		this.setState({ value, view: value });
		this.props.onChange(value);
	}
	today() {
		this.handleChange(moment());
	}

	handleDateChange(e) {
		let value = moment(new Date(e.target.dataset.value));
		this.handleChange(value);
	}

	handleYearChange(e) {
		let view = this.state.view.clone();
		view.year(e.target.value);
		this.setState({ view });
	}
	handleMonthChange(e) {
		let view = this.state.view.clone();
		view.month(e.target.value - 1);
		this.setState({ view });
	}

	nextMonth() {
		let view = this.state.view.clone().add(1, 'months');
		this.setState({ view });
	}
	preMonth() {
		let view = this.state.view.clone().add(-1, 'months');
		this.setState({ view });
	}

	renderDay() {
		let { value, view } = this.state;
		let today = moment().format('YYYY-MM-D');
		let current = value.format('YYYY-MM-D');
		let viewDate = view.format('YYYY-MM-');

		return range(1, view.daysInMonth() + 1).map((day) => {
			let date = viewDate + day;
			let isToday = today === date;
			let isCurrent = current === date;
			return (
				<li key={'day' + day}>
					<span
						data-value={date}
						className={cls({ today: isToday, current: isCurrent })}
						onClick={this.handleDateChange}
					>
						{day}
					</span>
				</li>
			);
		});
	}

	render() {
		let { value, view } = this.state;
		let { timerOption } = this.props;

		return (
			<div className="calendar">
				<div className="header">
					<div className="selects">
						<Select options={this.years} value={view.year()} onChange={this.handleYearChange} />
						<Select options={Calendar.months} value={view.month() + 1} onChange={this.handleMonthChange} />
					</div>
					<div className="actions">
						<span onClick={this.preMonth}>&lt;</span>
						<span onClick={this.today}>今天</span>
						<span onClick={this.nextMonth}>&gt;</span>
					</div>
				</div>
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
