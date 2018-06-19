import { createElement, cloneElement, Component, Children, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { Position, PositionPopperProps } from '../position';
import { Togglable } from '../togglable';
import { bindAll } from '../util';
import './popover.less';

interface PopoverProps extends HtmlHTMLAttributes<HTMLDivElement>, PositionPopperProps {
    target?: any;
    inner?: any;
    innerClassName?: string;

    arrow?: boolean;
    isShow?: boolean;

    trigger?: 'hover' | 'click';
    triggerPopover?: boolean;
    delay?: number;
}
interface PopoverState {
    isShow: boolean;
}

export class Popover extends Component<PopoverProps, PopoverState> {
    update: any;
    public static defaultProps: Partial<PopoverProps> = {
        trigger: 'hover',
        triggerPopover: true,
        innerClassName: 'skin-dark-ghost',
        delay: 200
    };

    public static getDerivedStateFromProps ({ isShow }, preState) {
        if (isShow !== undefined && isShow !== preState.isShow) {
            return { isShow };
        }
        return null;
    }

    state = {
        isShow: this.props.isShow || false
    };

    private events: any;
    constructor (p) {
        super(p);
        bindAll(this, 'fireHide', 'fireShow');

        let hover = {
            onMouseEnter: this.fireShow,
            onMouseLeave: this.fireHide
        };
        let focus = {
            tabIndex: '999',
            onFocus: this.fireShow,
            onBlur: this.fireHide
        };

        this.events =
            'isShow' in p
                ? {}
                : {
                      hover: hover,
                      focus: focus,
                      click: focus
                  };
    }

    private timer: any;
    private fireShow () {
        clearTimeout(this.timer);
        let { delay } = this.props;
        this.timer = setTimeout(() => this.setState({ isShow: true }, this.update), delay);
    }
    private fireHide () {
        clearTimeout(this.timer);
        let { delay } = this.props;
        this.timer = setTimeout(() => this.setState({ isShow: false }), delay);
    }

    render () {
        let { target, inner, children, trigger, arrow, placement, ...props } = this.props;
        let { isShow } = this.state;

        let [ pTarget = target, pInner = inner ] = Children.toArray(children);
        let innerCls = cls('popover', arrow && 'popover-arrow');
        let events = this.events[trigger!];

        return (
            <Position>
                <Position.Reference>
                    {({ getReferenceRef }) =>
                        cloneElement(pTarget, {
                            ref: getReferenceRef,
                            ...events
                        })}
                </Position.Reference>
                <Position.Popper placement={placement}>
                    {({ getPopperRef, update }) => {
                        this.update = update;
                        return (
                            <div
                                ref={getPopperRef}
                                className={innerCls}
                                {...props.triggerPopover && events}
                            >
                                <Togglable
                                    isVisible={isShow}
                                    className={cls('popover-inner', props.innerClassName)}
                                    animation='fadeIn'
                                    delay={300}
                                >
                                    {arrow && <div className="popover-inner-arrow"></div>}
                                    {pInner}
                                </Togglable>
                            </div>
                        );
                    }}
                </Position.Popper>
            </Position>
        );
    }
}
