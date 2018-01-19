import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as cls from 'classnames';
import * as noop from 'lodash/noop';
import * as pick from 'lodash/pick';
import * as throttle from 'lodash/throttle';

import { eachBind, containerNode, toType, compareObjWithKey, hasKey } from '../util';
import Popper from 'popper.js';
import './index.less';

export interface PopoverProps extends Popper.PopperOptions {
	className?: string;
	style?: React.CSSProperties;
	visible?: boolean;
	trigger?: 'hover' | 'click' | false;
	content?: React.ReactElement<any> | React.ReactNode | string;
	children: React.ReactElement<any>;
	delay?: string | number;
	arrowVisible?: boolean;
	prefix?: string;

	onHide?: Function;
	onShow?: Function;
}

interface PopoverState {
	visible: boolean;
	styles: React.CSSProperties;
	arrowStyles: React.CSSProperties;
	placement: Popper.Placement;
}
export class Popover extends React.PureComponent<PopoverProps, PopoverState> {
	public static defaultProps: Partial<PopoverProps> = {
		placement: 'auto',
		delay: 100,
		trigger: 'hover',
		arrowVisible: true,
		onCreate: noop,
		onUpdate: noop,
		onHide: noop,
		onShow: noop
	};

	instance: Popper;
	timeout: any;
	events: any;
	shouldShow: boolean;
	constructor(p) {
		super(p);

		this.state = {
			visible: p.visible || false,
			styles: {},
			arrowStyles: {},
			placement: p.placement
		};

		eachBind([ 'handleBodyClick', 'applyReactStyle', 'handleShow', 'handleHide' ], this);
		this.shouldShow = p.visible;
		this.events = this.getEventsProps();
	}

	applyReactStyle(data) {
		let { styles, visible } = this.state;
		if (!compareObjWithKey(styles, data.styles, [ 'transform' ])) {
			this.setState(pick(data, [ 'styles', 'placement', 'arrowStyles' ]));
		}

		return data;
	}

	componentDidMount() {
		this.initInstance();
	}

	initInstance() {
		if (this.state.visible && !this.instance) {

			let { wrap, target, popover, ...refs } = this.refs;
			let { placement, onCreate, onUpdate, arrowVisible } = this.props;
			let arrow = arrowVisible ? { element: findDOMNode(refs.arrow) } : {};

			this.instance = new Popper(findDOMNode(target), findDOMNode(popover), {
				placement,
				modifiers: {
					arrow,
					applyStyle: { enabled: false },
					applyReactStyle: { enabled: true, fn: throttle(this.applyReactStyle, 200), order: 900 }
				},
				onCreate,
				onUpdate
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (hasKey('visible', nextProps)) {
			this.setState(pick(nextProps, 'visible'));
		}
	}

	handleBodyClick(e) {
		if (this.state.visible && !containerNode(this.refs.wrap, e.target)) this.handleHide();
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleBodyClick);
		this.instance && this.instance.destroy();
	}

	getEventsProps() {
		let { trigger } = this.props;
		let events: any = {};

		if (trigger === 'hover') {
			events.onMouseEnter = this.handleShow;
			events.onMouseLeave = this.handleHide;
		} else if (trigger === 'click') {
			events.onClick = this.handleShow;
		}

		document.addEventListener('click', this.handleBodyClick);

		return events;
	}

	handleShow() {
		if (this.state.visible) return;
		clearTimeout(this.timeout);
		this.shouldShow = true
		this.timeout = setTimeout(() => {
			this.setState({ visible: true }, this.update);
		}, this.props.delay);
	}
	handleHide() {
		if (!this.state.visible) return;
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.setState({ visible: false });
		}, this.props.delay);
	}

	update() {
		this.initInstance();
		this.instance.update();
	}

	render() {
		let { children, content, className, style, arrowVisible, prefix } = this.props;
		let { visible, styles, placement, arrowStyles } = this.state;
		let popoverClass = cls('popover', { 'popover-show': visible }, prefix && prefix + '-popover');
		let wrapClass = cls('popover-wrap', prefix && prefix + '-popover-wrap', className);
		let arrowClass = cls('popover-arrow', prefix && prefix + '-popover-arrow');
		let innerClass = cls('popover-inner', prefix && prefix + '-popover-inner');

		return (
			<span {...this.events} className={wrapClass} ref="wrap" style={style}>
				{React.cloneElement(children, { ref: 'target' })}
				{this.shouldShow && (
					<div ref="popover" className={popoverClass} style={styles} data-placement={placement.split('-')[0]}>
						{arrowVisible && <div className={arrowClass} ref="arrow" style={arrowStyles} />}
						<div className={innerClass}>{content}</div>
					</div>
				)}
			</span>
		);
	}
}
