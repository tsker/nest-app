import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { bindAll, noop } from '../util';
import { Togglable } from '../togglable';
import { Icon } from '../icon';
import './alert.less';

interface AlertProps extends HtmlHTMLAttributes<HTMLDivElement> {
	closeIcon?: boolean;
	onClose?: any;
}
interface AlertState {
	isShow: boolean;
	closed: boolean;
}

export class Alert extends PureComponent<AlertProps, AlertState> {
	public static defaultProps: Partial<AlertProps> = {
		closeIcon: false,
		onClose:noop
	};

	state = {
		isShow: true,
		closed: false
	};

	constructor(p) {
		super(p);
		bindAll(this, 'handleClose', 'handleDone');
	}

	handleClose() {
		this.setState({ isShow: false });
	}
	handleDone() {
		this.setState({ closed: true }, this.props.onClose);
	}

	render() {
		let { closeIcon, className } = this.props;
		let { isShow, closed } = this.state;

		if (closed) {
			return null;
		}

		return (
			<Togglable
				className={className}
				isVisable={isShow}
				prefix="alert"
				onDone={this.handleDone}
				other={closeIcon && <Icon type="close" onClick={this.handleClose} />}
			>
				{this.props.children}
			</Togglable>
		);
	}
}
