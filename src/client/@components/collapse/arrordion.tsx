import { createElement, PureComponent, ReactElement, Children, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { pull,  noop } from "../util";
import { Collapse, CollapseProps } from './collapse';

interface ArrordionProps extends HtmlHTMLAttributes<HTMLDivElement> {
	mode?: 'multiple' | 'arrordion';
	defaultActiveKeys?: any[];
	activeKeys?: any[];

	onChange?: any;
}

interface ArrordionState {
	activeKeys: any[];
}

export class Arrordion extends PureComponent<ArrordionProps, ArrordionState> {
	public static defaultProps: Partial<ArrordionProps> = {
		mode: 'arrordion',
		onChange:noop
	};

	public static getDerivedStateFromProps(nextProps, preState) {
		if ('activeKeys' in nextProps && nextProps.activeKeys !== preState.activeKeys) {
			return { activeKeys: nextProps.activeKeys };
		}
		return null;
	}

	public state: ArrordionState = {
		activeKeys: this.props.defaultActiveKeys || [ '0' ]
	};

	constructor(p) {
		super(p);
		this.receiveKey = this.receiveKey.bind(this);
	}

	receiveKey(key) {
		let { mode } = this.props;
		let { activeKeys } = this.state;

		if (activeKeys.includes(key)) {
			activeKeys = pull(activeKeys, key)
		} else {
			activeKeys = mode === 'multiple' ? activeKeys.concat(key) : [ key ];
		}

		if (!('activeKeys' in this.props)) {
			this.setState({ activeKeys });
		}
		this.props.onChange(activeKeys);
	}

	getCollapses() {
		return Children.map(this.props.children, (child, index) => {
			let { key, props } = child as ReactElement<CollapseProps>;

			let $key = key || '' + index;
			let isOpen = this.state.activeKeys.includes($key);
			let enhanceProps = {
				$key,
				isOpen,
				receiveKey: this.receiveKey
			};

			return <Collapse {...props} {...enhanceProps} />;
		});
	}

	render() {
		return <div className="arrordion">{this.getCollapses()}</div>;
	}
}
