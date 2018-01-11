import * as React from 'react';
import * as cls from 'classnames';
import { toType, eachBind, wrapPromise } from '../util';
import { Button, Icon } from '../';

export interface ModalProps {
	visible: boolean;
	className?: string;
	mid?: string;
	clickaway?: boolean;
	title?: any;
	content?: JSX.Element;
	mask?: boolean;

	onClose?: any;
	onConfirm?: any;
}
interface ModalState {
	visible: boolean;
	loading: boolean;
}

export class Modal extends React.PureComponent<ModalProps, ModalState> {
	public static defaultProps = {
		mask: true
	};
	constructor(p) {
		super(p);
		this.state = {
			visible: p.visible,
			loading: false
		};

		eachBind([ 'close', 'confirm', 'clickawayClose' ], this);
	}
	componentWillReceiveProps({ visible }) {
		if (visible !== this.state.visible) {
			this.setState({ visible });
		}
	}

	confirm() {
		let { onConfirm } = this.props;

		if (onConfirm) {
			let result = onConfirm();
			if (toType(result) === 'promise') {
				this.setState({ loading: true });
				const stop = () => (this.close(), this.setState({ loading: false }));
				return wrapPromise(stop, result);
			} else if (result) {
				this.close();
			}
		}

		return this.close();
	}

	close() {
		let { onClose } = this.props;
		if (onClose) {
			onClose();
		}
		this.setState({ visible: false });
	}

	clickawayClose() {
		if (this.props.clickaway) {
			this.close();
		}
	}

	render() {
		let { className, children, content, title = ' ', mid, mask } = this.props;
		let { visible, loading } = this.state;
		return (
			<div
				className={cls('modal-layout', className, {
					'modal-show': visible
				})}
				data-modal-id={mid}
			>
				<div className="modal">
					<div className="modal-title">{title}</div>
					<div className="modal-body">{content || children}</div>
					<div className="modal-actions">
						<Button className="modal-action-close" onClick={this.close} disabled={loading}>
							关闭
						</Button>
						<Button className="modal-action-confirm" onClick={this.confirm} loading={loading}>
							确认
						</Button>
					</div>
					<Icon type="close" className="modal-close" onClick={this.close} />
				</div>
				{mask && <div className="modal-mask" onClick={this.clickawayClose} />}
			</div>
		);
	}
}
