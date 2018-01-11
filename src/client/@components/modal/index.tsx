import * as React from 'react';
import { createPortal, render } from 'react-dom';
import * as cls from 'classnames';
import { createNode, toType, eachBind, nextUid } from '../util';
import { Modal, ModalProps } from './modal';
import { ModalContainer } from './container';
import './index.less';

let node, container;

class ModalPortal extends React.PureComponent<ModalProps> {
	node: HTMLElement = createNode();
	public static open(options) {
		if (!node) {
			node = createNode();
		}
		if (!container) {
			container = render(<ModalContainer />, node);
		}

		container.addModal({ ...options, clickaway: false, mid: nextUid() });
	}
	public static alert(content, title?, onConfirm?) {
		ModalPortal.open({ content, title, onConfirm });
	}
	public static confirm(content, title?, onConfirm?) {
		ModalPortal.open({ content, title, onConfirm });
	}

	componentWillUnmount() {
		document.body.removeChild(this.node);
	}
	render() {
		return createPortal(<Modal {...this.props} />, this.node);
	}
}

export { ModalPortal as Modal };
