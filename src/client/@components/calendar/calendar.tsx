import * as React from 'react';
import * as cls from 'classnames';
import * as moment from 'moment';
import * as range from 'lodash/range';
import * as noop from 'lodash/noop';
import { eachBind, toType, hasValue, exchangeMoment } from '../util';
import { Select, Timer, TimerProps } from '..';

import './calendar.less';

export interface CalendarProps {
	className?: string;
	weeks?: string[];

	value?: moment.Moment;
	defaultValue?: moment.Moment;
	view?: moment.Moment;

	onChange?: any;
	disabledDate?: any;

	timerOption?: TimerProps;

	rightArrow?: boolean;
	leftArrow?: boolean;
}
interface DateRangeCalendarProps {
	dir?: 'left' | 'right';
	selectValue?: moment.Moment[];
	hoverValue?: moment.Moment;
	onHover?: any;
	onViewChange?: any;
}
'';
interface CalendarState {
	value: moment.Moment;
	view: moment.Moment;
}

export class Calendar extends React.PureComponent<CalendarProps & DateRangeCalendarProps, CalendarState> {
	years: number[];
	public static months = range(1, 13);

	public static defaultProps = {
		weeks: [ '一', '二', '三', '四', '五', '六', '日' ],
		defaultValue: moment(),
		onChange: noop,
		disabledDate: noop,

		// range
		leftArrow: true,
		rightArrow: true,
		onHover: noop,
		onViewChange: noop
	};
	constructor(p) {
		super(p);
		let value = p.value || p.defaultValue;
		let view = p.view || value;
		this.state = { value, view };
		this.years = range(value.year() - 5, value.year() + 6);
		eachBind(
			[ 'handleChange', 'handleDateChange', 'handleDateHover', 'handleTimerChange', 'handleViewChange' ],
			this
		);
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps) && nextProps.value) {
			this.setState({ value: nextProps.value });
		}
	}

	handleViewChange(e) {
		let view = this.state.view.clone();
		let { name, value, dataset } = e.target;
		let { dir, onViewChange } = this.props;

		if (value) {
			view[name](value);
		} else {
			view.add(dataset.step, dataset.name);
		}
		this.setState({ view });
		onViewChange(dir, view);
	}

	handleTimerChange(value) {
		let { dir, onChange } = this.props;
		if (dir) {
			onChange(value, dir);
		} else {
			this.handleChange(value);
		}
	}

	handleChange(value) {
		if (!hasValue(this.props)) {
			this.setState({ value });
		}
		this.props.onChange(value);
	}
	handleDateHover(e) {
		let view = this.state.view.clone();
		view.date(e.target.dataset.value);
		this.props.onHover(view);
	}

	handleDateChange(e) {
		let value = this.state.view.clone();
		value.date(e.target.dataset.value);
		this.handleChange(value);
	}

	renderDay() {
		let { value, view } = this.state;
		let { selectValue = [], hoverValue, disabledDate } = this.props;
		let [ start, end ] = selectValue;
		let [ betweenS, betweenE ] = exchangeMoment(start, end || hoverValue);
		let today = moment();

		return range(1, view.daysInMonth() + 1).map((day) => {
			let date = view.clone().date(day);
			let disabled = disabledDate(date);
			let classname = cls({
				today: date.isSame(today, 'date'),
				disabled,
				current: start
					? date.isSame(start, 'date') || (end && date.isSame(end, 'date'))
					: date.isSame(value, 'date'),
				selected: betweenS && date.isBetween(betweenS, betweenE, 'date'),
				'hover-end': hoverValue && date.isSame(hoverValue, 'date')
			});
			return (
				<li key={'day' + day} className={classname}>
					<span
						data-value={day}
						onClick={disabled ? noop : this.handleDateChange}
						onMouseEnter={disabled ? noop : this.handleDateHover}
					>
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
			<li key={i} className="empty">
				<span />
			</li>
		));
	}

	renderMonths() {
		let { disabledDate } = this.props;
		let view = this.state.view.clone();
		let currentMonth = view.month();
		let options = range(0, 12).map((month) => {
			return {
				text: month + 1,
				value: month,
				disabled: disabledDate(view.month(month))
			};
		});
		return <Select name="month" options={options} value={currentMonth} onChange={this.handleViewChange} />;
	}

	render() {
		let { value, view } = this.state;
		let { timerOption, className, leftArrow, rightArrow } = this.props;

		return (
			<div className={cls('calendar', className)}>
				<div className="header">
					{leftArrow && (
						<span data-name="month" data-step="-1" onClick={this.handleViewChange}>
							&lt;
						</span>
					)}
					<Select name="year" options={this.years} value={view.year()} onChange={this.handleViewChange} />
					{this.renderMonths()}
					{rightArrow && (
						<span data-name="month" data-step="1" onClick={this.handleViewChange}>
							&gt;
						</span>
					)}
				</div>
				<div className="body">
					<ul className="weeks">{this.renderWeek()}</ul>
					<ul className="days">
						{this.renderEmptyDay()}
						{this.renderDay()}
					</ul>
				</div>
				<div className="footer">
					<Timer {...timerOption} value={value} onChange={this.handleTimerChange} />
				</div>
			</div>
		);
	}
}
