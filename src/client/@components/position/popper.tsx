import { createElement, Component, ReactNode } from 'react';

import { PositionNativeJS,PositionNativeJSOpts } from './package/position';
import { Consumer, getRefFn } from './context';
import { bindAll, delayFn, pick } from '../util';

interface PositionPopperWrapperChildProps {
	getPopperRef: getRefFn;
}

interface PositionPopperWrapperProps extends PositionNativeJSOpts {
	children: (x: PositionPopperWrapperChildProps) => ReactNode;
}

interface PositionPopperProps extends PositionPopperWrapperProps {
	reference?: HTMLElement;
}
interface PositionPopperState {
	popper?: HTMLElement;
}

class PositionPopper extends Component<PositionPopperProps, PositionPopperState> {
	private popperInstance: PositionNativeJS | undefined;

	public static defaultProps: Partial<PositionPopperProps> = {};

	constructor(p) {
		super(p);
		this.state = {};
		bindAll(this, 'getPopperRef');
	}

	getPopperRef(popper) {
		this.setState({ popper });
	}

	initPopper() {
		let { reference, placement } = this.props;
		let { popper } = this.state;
		if (!this.popperInstance && reference && popper) {
			this.popperInstance = new PositionNativeJS(reference, popper, { placement });
			return true;
		}
		return false;
	}
	componentDidUpdate() {
		this.initPopper();
	}

	componentWillUnmount() {
		if (this.popperInstance) {
			this.popperInstance.destory();
		}
	}

	render() {
		return this.props.children({
			getPopperRef: this.getPopperRef
		});
	}
}

export function PositionPopperWrapper(props: PositionPopperWrapperProps) {
	return (
		<Consumer>
			{({ reference }) => <PositionPopper reference={reference} {...props} />}
		</Consumer>
	);
}
