import { createElement, cloneElement, PureComponent, Children, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { Position, PositionPopperProps } from '../position';
import { bindAll } from '../util';
import './popover.less';

interface PopoverProps extends HtmlHTMLAttributes<HTMLDivElement>, PositionPopperProps {
    target?: any;
    inner?: any;

    arrow?: boolean;
    isShow?: boolean;

    trigger?: 'hover' | 'click';
    triggerPopover?: boolean;
    delay?: number;
}
interface PopoverState {
    isShow: boolean;
}

export class Popover extends PureComponent<PopoverProps, PopoverState> {
    public static defaultProps: Partial<PopoverProps> = {
        trigger: 'hover',
        triggerPopover: true,
        delay: 200
    };

    public static getDerivedStateFromProps ({ isShow }, preState) {
        if (isShow !== preState.isShow) {
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
    private fire (isShow, delay?) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (isShow !== this.state.isShow) {
                this.setState({ isShow });
            }
        }, delay || this.props.delay);
    }
    private fireShow () {
        this.fire(true, 20);
    }
    private fireHide () {
        this.fire(false);
    }

    render () {
        let { target, inner, children, trigger, triggerPopover, placement, arrow } = this.props;
        let { isShow } = this.state;

        let [ pTarget = target, pInner = inner ] = Children.toArray(children);
        let innerCls = cls('popover', arrow && 'popover-arrow', !isShow && 'hide');
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
                    {({ getPopperRef }) => (
                        <div ref={getPopperRef} className={innerCls} {...triggerPopover && events}>
                            <div className='popover-inner'>{pInner}</div>
                        </div>
                    )}
                </Position.Popper>
            </Position>
        );
    }
}
