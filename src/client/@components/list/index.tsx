import * as React from 'react';
import * as cls from 'classnames';
import * as identity from "lodash/identity";
import { eachBind } from '../util';
import './index.less';
import { clearTimeout } from 'timers';

interface ListProps extends React.HTMLProps<HTMLDivElement> {
	renderItem: any;
	options: any[];
	maxShowCount?: number;
	rowKey?: string;
}

interface ListState {
	scrollTop: number;
	start: number;
	end: number;
	endScroll: number;
	startScroll: number;
}

/**
 * 只适用于列表内元素高度一致、且元素超多的情况，其他情况勿用，也没有必要用
 */
export class List extends React.PureComponent<ListProps, ListState> {
	public static defaultProps = {
		maxShowCount: 50,
		rowKey: 'key'
	};

	itemHeight: number = 0;

	constructor(p) {
		super(p);
		this.state = this.getRange(0);

		eachBind([ 'handleScroll', 'forceUpdate' ], this);
	}

	componentDidMount() {
		let child = this.refs.ul['children'][0];
		if (child) {
			this.itemHeight = child.clientHeight;
			setTimeout(this.forceUpdate, 1);
		}
	}

	getRange(scrollTop) {
		let { maxShowCount, options } = this.props;
		let { itemHeight } = this;
		let offset = Math.floor(maxShowCount! / 2);
		let current = Math.floor(scrollTop / this.itemHeight) || 0;

		let start = Math.max(current - offset, 0);
		let end = Math.min(current === 0 ? maxShowCount! : current + offset, options.length);

		let startScroll = (start === 0 ? start : start + 2) * itemHeight;
		let endScroll = (end === options.length ? end : end - 10) * itemHeight;

		return { start, end, startScroll, endScroll, scrollTop };
	}

	handleScroll(e) {
		let { scrollTop } = e.target;
		let { startScroll, endScroll } = this.state;

		if (scrollTop < startScroll || scrollTop > endScroll) {
			this.setState(this.getRange(scrollTop));
		}
	}

	render() {
		let { itemHeight } = this;
		let { className, renderItem, options, maxShowCount, rowKey } = this.props;
		let { scrollTop, start, end } = this.state;

		let items = options!.slice(start, end).map(({ ...option }, index) => (
			<li key={option[rowKey!]} className="__list-item" style={{ top: (start + index) * itemHeight }}>
				{renderItem(option)}
			</li>
		));

		return (
			<div className={cls('__list', className)} onScroll={this.handleScroll}>
				<ul className="__list-ul" ref="ul" style={{ height: itemHeight * options.length }}>
					{items}
				</ul>
			</div>
		);
	}
}
