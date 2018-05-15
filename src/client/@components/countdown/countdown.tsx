import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { bindAll, noop } from '../util';
import './countdown.less';

interface CountdownProps extends HtmlHTMLAttributes<HTMLSpanElement> {
	count?: number;
	endCount?: number;
	onDone?: any;

	mode?: 'time' | 'count';
	endDate?: string | Date;
}
interface CountdownState {
	count: number;
}

export class Countdown extends PureComponent<CountdownProps, CountdownState> {
	public static defaultProps: Partial<CountdownProps> = {
		count: 0,
		endCount: 0,
		onDone: noop
	};

	constructor(p) {
		super(p);
		let { mode, count, endDate } = p;

		if (mode === 'time' && endDate) {
			if (typeof endDate === 'string') {
				endDate = endDate.replace('-', '/');
			}
			let diffTime = new Date(endDate).getTime() - Date.now();
			count = Math.floor(diffTime / 1000);
		}

		this.state = { count };
		bindAll(this, 'decrement');
	}

	private timer: any;
	componentDidMount() {
		this.timer = setInterval(this.decrement, 1e3);
		this.decrement();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	decrement() {
		let { endCount } = this.props;
		let { count } = this.state;

		if (count <= endCount!) {
			clearInterval(this.timer);
			this.props.onDone();
		} else {
			this.setState({ count: count - 1 });
		}
	}

	formatSecond(second) {
		return {
			seconds: '' + Math.max(0, Math.floor(second % 60)),
			minutes: '' + Math.max(0, Math.floor((second / 60) % 60)),
			hours: '' + Math.max(0, Math.floor((second / 60 / 60) % 24)),
			days: '' + Math.max(0, Math.floor(second / 60 / 60 / 24))
		};
	}

	renderTimeCol(value) {
		return <span>{value.padStart(2, 0)}</span>;
	}

	render() {
		let { count } = this.state;

		if (this.props.mode === 'time') {
			let time = this.formatSecond(count);
			return (
				<span className="countdown-time">
					{this.renderTimeCol(time.days)}
					<span className="countdown-separate">:</span>
					{this.renderTimeCol(time.hours)}
					<span className="countdown-separate">:</span>
					{this.renderTimeCol(time.minutes)}
					<span className="countdown-separate">:</span>
					{this.renderTimeCol(time.seconds)}
				</span>
			);
		}

		return <span>{count}</span>;
	}
}
