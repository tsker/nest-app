import { createElement, Component, ReactNode } from 'react';

import { PositionNativeJS, PositionNativeJSOpts } from './package/position';
import { Consumer, getRefFn } from './context';
import { bindAll, delayFn, pick } from '../util';

interface PositionPopperChildProps {
    getPopperRef: getRefFn;
    update?: any;
}

interface PositionPopperWrapperProps extends PositionNativeJSOpts {
    children: (x: PositionPopperChildProps) => ReactNode;
}

interface PositionPopperProps extends PositionPopperWrapperProps {
    reference?: HTMLElement;
}
interface PositionPopperState {
    popper?: HTMLElement;
}

class PositionPopper extends Component<PositionPopperProps, PositionPopperState> {
    private popperInstance?: PositionNativeJS;

    public static defaultProps: Partial<PositionPopperProps> = PositionNativeJS.defaultOpts;

    constructor (p) {
        super(p);
        this.state = {};
        bindAll(this, 'getPopperRef', 'update');
    }

    getPopperRef (popper) {
        this.setState({ popper });
    }

    initPopper () {
        let { reference,children, ...opts } = this.props;
        let { popper } = this.state;
        if (!this.popperInstance && reference && popper) {
            this.popperInstance = new PositionNativeJS(reference, popper, opts);
            return true;
        }
        return false;
    }
    destoryPopper () {
        if (!this.popperInstance) {
            return;
        }

        this.popperInstance.destory();
        this.popperInstance = undefined;
    }

    update () {
        if (this.popperInstance) {
            this.popperInstance.scheduleUpdate();
        }
    }

    componentDidUpdate (preProps) {
        if (!this.initPopper()) {
            if (
                this.props.placement !== preProps.placement ||
                this.props.flip !== preProps.flip ||
                this.props.reference !== preProps.reference
            ) {
                this.destoryPopper();
                this.initPopper();
            }
        }
    }
    componentWillUnmount () {
        this.destoryPopper();
    }

    render () {
        return this.props.children({ getPopperRef: this.getPopperRef, update: this.update });
    }
}

export { PositionNativeJSOpts as PositionPopperProps };
export function PositionPopperWrapper (props: PositionPopperWrapperProps) {
    return (
        <Consumer>
            {({ reference }) => <PositionPopper reference={reference} {...props} />}
        </Consumer>
    );
}
