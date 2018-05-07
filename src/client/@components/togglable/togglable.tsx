import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

interface TogglableProps extends HtmlHTMLAttributes<HTMLDivElement> {
	isVisable?: boolean;
	delay?: number;
	onDone?: any;
	prefix?: string;
	other?: any;
}

export class Togglable extends PureComponent<TogglableProps> {
	public static defaultProps: Partial<TogglableProps> = {
		isVisable: true,
		delay: 300,
		prefix: 'togglable',
		onDone() {}
	};
	public static getDerivedStateFromProps(nextProps, preState) {
		if (nextProps.isVisable && !preState.isRender) {
			return { isRender: true };
		}
		return null;
	}
	public state = { isRender: this.props.isVisable };

	private timer: any;
	private rootEl: any;
	private rootRef = (el) => {
		if (el) {
			this.rootEl = el;
		}
	};

	componentDidUpdate(preProps) {
		let { rootEl } = this;
		let { delay, isVisable, onDone } = this.props;

		if (preProps.isVisable === isVisable) {
			return;
		}

		rootEl.removeAttribute('style');
		let height = rootEl.offsetHeight;

		let transitionCss = delay ? `transition: all ease ${delay / 1000}s` : '';

		let start = `height: ${isVisable ? 0 : height}px; ${transitionCss}`;
		let to = `height: ${!isVisable ? 0 : height}px;${transitionCss}`;
		let end = isVisable ? '' : 'display:none';

		rootEl.setAttribute('style', start);
		setTimeout(() => rootEl.setAttribute('style', to), 0);

		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			rootEl.setAttribute('style', end);
			onDone();
		}, delay);
	}
	render() {
		if (!this.state.isRender) {
			return null;
		}

		let { delay, isVisable, prefix, onDone, other, ...props } = this.props;
		let contentCls = cls(`${prefix}-content`, props.className);
		return (
			<div ref={this.rootRef} className={cls(prefix, 'hidden')}>
				<div {...props} className={contentCls} />
				{other}
			</div>
		);
	}
}
