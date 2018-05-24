import { createElement, PureComponent, HtmlHTMLAttributes, Children, ReactNode } from 'react';
import * as cls from 'classnames';

import { noop, bindAll, TimeQueue, upperFirst } from '../util';

export enum EnterStatus {
    START = 'enter-start',
    ACTIVE = 'enter-active',
    END = 'enter-end'
}
export enum OutStatus {
    START = 'out-start',
    ACTIVE = 'out-active',
    END = 'out-end'
}

type TransitionStatus = EnterStatus | OutStatus | 'mounting';
interface TransitionProps {
    enter?: boolean;
    isEnterWithMounted?: boolean;
    delay?: number;
    children: (x: TransitionStatus) => ReactNode;

    onStart?: (x: TransitionStatus) => void;
    onActive?: (x: TransitionStatus) => void;
    onEnd?: (x: TransitionStatus) => void;
}
interface TransitionState {
    isMount: boolean;
    status: TransitionStatus;
    statusLife: typeof EnterStatus | typeof OutStatus;
}

export class Transition extends PureComponent<TransitionProps, TransitionState> {
    public static defaultProps: Partial<TransitionProps> = {
        enter: false,
        delay: 1000,
        isEnterWithMounted: false,
        onStart: noop,
        onActive: noop,
        onEnd: noop
    };

    public static getDerivedStateFromProps (nextProps, preState) {
        let statusLife = nextProps.enter ? EnterStatus : OutStatus;
        return { statusLife };
    }

    private queue: TimeQueue;

    constructor (p) {
        super(p);

        let statusLife = p.enter ? EnterStatus : OutStatus;
        this.state = { statusLife, status: statusLife.END, isMount: false };

        bindAll(this, 'transitionStart', 'transitionActive', 'transitionEnd');
        this.queue = new TimeQueue({
            tasks: [ this.transitionStart, this.transitionActive, this.transitionEnd ],
            times: [ 0, p.delay ]
        });
    }

    transitionStart () {
        if (this.state.status.match('end')) {
            let status = this.state.statusLife.START;
            this.setState({ status }, () => this.props.onStart!(status));
        }
    }
    transitionActive () {
        let status = this.state.statusLife.ACTIVE;
        this.setState({ status }, () => this.props.onActive!(status));
    }
    transitionEnd () {
        let status = this.state.statusLife.END;
        this.setState({ status }, () => this.props.onEnd!(status));
    }

    componentDidMount () {
        let { props } = this;

        this.setState({ isMount: true });
        props.onEnd!('mounting');

        if (props.enter && props.isEnterWithMounted) {
            this.queue.start();
        }
    }

    componentDidUpdate (preProps) {
        if (this.props.enter !== preProps.enter) {
            this.queue.start();
        }
    }

    componentWillUnmount () {
        this.queue.cancel();
    }

    render () {
        let { status, isMount } = this.state;
        let { children } = this.props;

        return children(isMount ? status : 'mounting');
    }
}
