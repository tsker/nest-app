import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import { findDOMNode } from 'react-dom';
import * as cls from 'classnames';

import { Provider, IContext } from './context';
import { PositionReference } from './reference';
import { PositionPopperWrapper } from './popper';

interface PositionState {
    context: IContext;
}

export class Position extends PureComponent<{}, PositionState> {
    public static Reference = PositionReference;
    public static Popper = PositionPopperWrapper;

    public state = {
        context: {
            getReferenceRef: this.getReferenceRef.bind(this),
            reference: undefined
        }
    };

    getReferenceRef (reference: HTMLElement) {
        this.setState({
            context: {
                ...this.state.context,
                reference: findDOMNode(reference) as HTMLElement
            }
        });
    }

    render () {
        return <Provider value={this.state.context}>{this.props.children}</Provider>;
    }
}
