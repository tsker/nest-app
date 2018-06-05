import { createElement, PureComponent, HtmlHTMLAttributes, createRef } from 'react';
import * as cls from 'classnames';

import { Transition, EnterStatus, OutStatus } from '../transition';
import { noop, bindAll } from '../util';

interface TogglableProps extends HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * 是否显示组件
     */
    isVisible?: boolean;
    /**
     * 组件从显示到完全隐藏时，此为一个周期
     * 每一次的周期完成，都会调用done事件一次
     * 也就是组件每到达一次 OutStatus.END 的状态，都会调用done
     */
    onDone?: any;
    /**
     * 在组件初次挂载后执行一次enter状态
     */
    isEnterWithMounted?: boolean;
    /**
     * 动画时间
     */
    delay?: number;
    /**
     * 启用的动画
     */
    animation?: string;
    /**
     * 在组件隐藏后，是否保留dom结构
     */
    isKeepDom?: boolean;
}

interface TogglableState {
    /**
     * 如果组件的isVisible默认为false;
     * 初次挂载组件将不会执行任何逻辑
     * 将下一次显示做为初态
     * 此状态的改变，只有一次
     */
    isRender: boolean;
}

export class Togglable extends PureComponent<TogglableProps, TogglableState> {
    static defaultProps: Partial<TogglableProps> = {
        isVisible: true,
        className: 'togglable',
        onDone: noop,
        isEnterWithMounted: true,

        animation: 'autoHeight',
        delay: 400,

        isKeepDom: true
    };

    static getDerivedStateFromProps (nextProps, preState) {
        if (nextProps.isVisible && !preState.isRender) {
            return { isRender: true };
        }

        return null;
    }

    private rootEl: React.RefObject<HTMLDivElement> = createRef();
    private rootElHeight: number = 0;
    constructor (p) {
        super(p);

        this.state = { isRender: p.isVisible };

        bindAll(this, 'handleEnd');
    }

    handleEnd (status) {
        if (status === 'mounting' && this.props.animation === 'autoHeight') {
            this.updateElHeight();
        }

        if (status === OutStatus.END) {
            this.props.onDone();
        }
    }

    updateElHeight () {
        let { current } = this.rootEl;
        if (current && current.offsetHeight > 0) {
            this.rootElHeight = current.offsetHeight;
        }
    }

    getAutoHeightAnimationStyle (status, delay) {
        // 修正 显示后高度变化检测不到
        // 在显示后如果高度有变化，在状态改变的一瞬间，为渲染一次上一结束状态，此时更新高度
        if (status.match(/-end$/)) {
            this.updateElHeight();
        }

        let style: any = {
            transition: `all ease ${delay! / 1000}s`,
            overflow: 'hidden'
        };
        switch (status) {
            case EnterStatus.START:
            case OutStatus.ACTIVE:
                style.height = 0;
                break;
            case EnterStatus.ACTIVE:
            case OutStatus.START:
                style.height = this.rootElHeight + 'px';
                break;
            case EnterStatus.END:
                style.height = 'auto';
                break;
        }

        return style;
    }

    getTransitionProps (status, className) {
        let { animation, delay } = this.props;
        let style;

        if (animation === 'autoHeight') {
            style = this.getAutoHeightAnimationStyle(status, delay);
        } else {
            let isEnter = status.match(/^enter-/);
            if (!isEnter) {
                animation = animation!.replace('In', 'Out');
            }

            style = delay && { animationDuration: `${delay / 1000}s` };
            className = cls(className, 'animated', animation);
        }

        if (status === OutStatus.END) {
            style.display = 'none';
        }

        return { className, style };
    }

    render () {
        if (!this.state.isRender) {
            return null;
        }

        let {
            isVisible,
            onDone,
            className,
            isEnterWithMounted,
            delay,
            isKeepDom,
            ...props
        } = this.props;

        return (
            <Transition
                enter={isVisible}
                onEnd={this.handleEnd}
                isEnterWithMounted={isEnterWithMounted}
                delay={delay}
            >
                {(status) => {
                    if (!isKeepDom && status === OutStatus.END) {
                        return null;
                    }

                    return (
                        <div
                            ref={this.rootEl}
                            {...props}
                            {...this.getTransitionProps(status, className)}
                        />
                    );
                }}
            </Transition>
        );
    }
}
