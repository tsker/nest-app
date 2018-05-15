import { createElement, cloneElement, PureComponent, Children, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { bindAll } from '../util';
import './popover.less';

interface PopoverProps extends HtmlHTMLAttributes<HTMLDivElement> {
	target?: any;
	inner?: any;
	arrow?: boolean;

	trigger?: 'hover' | 'click' | 'focus';
	triggerPopover?: boolean;
	delay?: number;
}
interface PopoverState {
	isShow: boolean;
	isInitPosition: boolean;
}

export class Popover extends PureComponent<PopoverProps, PopoverState> {
	public static defaultProps: Partial<PopoverProps> = {
		trigger: 'hover',
		triggerPopover: true,
		delay: 200
	};
	state = {
		isShow: false,
		isInitPosition: false
	};

	private events: any;
	constructor(p) {
		super(p);
		bindAll(this, 'fireHide', 'fireShow', 'initPosition');
		this.events = {
			hover: {
				onMouseEnter: this.fireShow,
				onMouseLeave: this.fireHide
			},
			click: {
				tabIndex: '999',
				onFocus: this.fireShow,
				onBlur: this.fireHide
			}
		};
	}

	private initPosition() {
		this.setState({ isInitPosition: true });
	}

	private timer: any;
	private fire(isShow, delay?) {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (isShow !== this.state.isShow) {
				this.setState({ isShow });
			}
		}, delay || this.props.delay);
	}
	private fireShow() {
		this.fire(true, 20);
	}
	private fireHide() {
		this.fire(false);
	}

	render() {
		let { target, inner, children, trigger, triggerPopover } = this.props;
		let { isInitPosition, isShow } = this.state;
		let { events } = this;

		let [ pTarget = target, pInner = inner ] = Children.toArray(children);
		let innerCls = cls('popover-inner', isInitPosition && !isShow && 'hide');

		return (
			<div></div>
		);
	}
}
