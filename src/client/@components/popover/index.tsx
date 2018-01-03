import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as cls from 'classnames';
import * as noop from 'lodash/noop';
import * as pick from 'lodash/pick';
import * as throttle from 'lodash/throttle';

import { eachBind, containerNode, toType, compareObjWithKey } from '../util';
import Popper from 'popper.js';
import './index.less';

export interface PopoverProps extends Popper.PopperOptions {
	visible?: boolean;
	trigger?: 'hover' | 'click';
	content?: React.ReactElement<any> | string;
	children: React.ReactElement<any>;
	className?: string;
	delay?: string | number;
	arrowVisible?: boolean;
}

interface PopoverState {
	visible: boolean;
	styles: React.CSSProperties;
	arrowStyles: React.CSSProperties;
	placement: Popper.Placement;
}
export class Popover extends React.PureComponent<PopoverProps, PopoverState> {
	instance: Popper;
	timeout: any;
	events: any;
	public static defaultProps: Partial<PopoverProps> = {
		placement: 'top-start',
		delay: 100,
		trigger: 'hover',
		arrowVisible: true,
		onCreate: noop,
		onUpdate: noop
	};

	constructor(p) {
		super(p);

		this.state = {
			visible: p.visible || false,
			styles: {},
			arrowStyles: {},
			placement: 'auto'
		};

		eachBind([ 'handleBodyClick', 'applyReactStyle', 'handleShow', 'handleHide' ], this);
		this.events = this.getEventsProps();
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.handleBodyClick);
		this.instance.destroy();
	}
	handleBodyClick(e) {
		if (!containerNode(this.refs.wrap, e.target)) this.handleHide();
	}

	applyReactStyle(data) {
		let { styles, visible } = this.state;
		if (!styles.position || (visible && !compareObjWithKey(styles, data.styles, [ 'transform' ]))) {
			this.setState(pick(data, [ 'styles', 'placement', 'arrowStyles' ]));
		}

		return data;
	}
	componentDidMount() {
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

	handleShow() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.setState({ visible: true }, this.update);
		}, this.props.delay);
	}
	handleHide() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.setState({ visible: false });
		}, this.props.delay);
	}

	getEventsProps() {
		let { trigger } = this.props;
		let props: any = {};
		if (trigger === 'hover') {
			props.onMouseEnter = this.handleShow;
			props.onMouseLeave = this.handleHide;
		} else {
			props.onClick = this.handleShow;
			document.body.addEventListener('click', this.handleBodyClick);
		}

		return props;
	}

	update() {
		this.instance.update();
	}

	render() {
		let { children, content, className, arrowVisible } = this.props;
		let { visible, styles, placement, arrowStyles } = this.state;
		let popoverClass = cls('popover', { 'popover-show': visible }, className);

		return (
			<span {...this.events} className="popover-wrap" ref="wrap">
				{React.cloneElement(children, { ref: 'target' })}
				<div ref="popover" className={popoverClass} style={styles} data-placement={placement.split('-')[0]}>
					{arrowVisible && <div className="popover-arrow" ref="arrow" style={arrowStyles} />}
					<div className="popover-inner">{content}</div>
				</div>
			</span>
		);
	}
}
