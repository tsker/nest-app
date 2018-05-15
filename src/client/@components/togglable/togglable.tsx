import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';
import { noop, TimeQueue, bindAll } from '../util';

interface TogglableProps extends HtmlHTMLAttributes<HTMLDivElement> {
	isVisible?: boolean;
	delay?: number;
	onDone?: any;
}

interface TogglableState {
	isRender: boolean;
}

export class Togglable extends PureComponent<TogglableProps, TogglableState> {
	public static defaultProps: Partial<TogglableProps> = {
		isVisible: true,
		delay: 300,
		className: 'togglable',
		onDone: noop
	};
	public static getDerivedStateFromProps(nextProps, preState) {
		if (nextProps.isVisible && !preState.isRender) {
			return { isRender: true };
		}
		return null;
	}
	public state = { isRender: this.props.isVisible || false };

	private rootEl: any;
	private rootElHeight: number = 0;
	private rootRef = (el) => {
		if (el) {
			this.rootEl = el;
		}
	};

	private queue: any;
	constructor(p) {
		super(p);
		bindAll(this, 'animationStart', 'animationActive', 'animationDone');

		this.queue = new TimeQueue({
			onDone: this.animationDone,
			tasks: [ this.animationStart, this.animationActive ],
			times: [ 0, p.delay ]
		});
	}

	animationStart({ delay, isVisible }) {
		let { rootEl } = this;

		rootEl.removeAttribute('style');
		let height = (this.rootElHeight = rootEl.offsetHeight);

		let transitionCss = `transition: all ease ${delay / 1000}s`;
		rootEl.setAttribute('style', `${transitionCss}; height:${isVisible ? 0 : height}px`);
	}
	animationActive({ isVisible }) {
		let height = !isVisible ? 0 : this.rootElHeight;
		this.rootEl.style.height = height + 'px';
	}
	animationDone({ isVisible }) {
		this.rootEl.setAttribute('style', isVisible ? '' : 'display: none');
	}

	componentDidUpdate(preProps) {
		let { props } = this;
		let diff = preProps.isVisible !== props.isVisible
		return  diff && this.queue.start(props);
	}
	render() {
		if (!this.state.isRender) {
			return null;
		}

		let { delay, isVisible, onDone, ...props } = this.props;
		return <div ref={this.rootRef} {...props} className={cls(props.className, 'hidden')} />;
	}
}
