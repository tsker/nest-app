import { createElement, Component, HtmlHTMLAttributes, ReactNode, createRef } from 'react';
import * as cls from 'classnames';

import { Togglable, CloseButton } from '../';
import { CreatePortal, BodyHidden, noop, bindAll, type } from '../util';
import './modal.less';

import * as modalManager from "./manager";

export interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * 是否显示组件
     */
    isVisible?: boolean;
    /**
     * 在组件隐藏后，是否保留dom结构
     */
    isKeepDom?: boolean;
    /**
     * 是否开启portal渲染
     */
    renderToPortal?: boolean;
    /**
    * 是否开启portal渲染
    */
    isMove?: boolean;

    title?: any;
    footer?: ReactNode | null;
    closeIcon?: boolean | null;
    onOk?: any;
    okText?: string | null;
    onClose?: any;
    closeText?: string | null;

    renderMask?: boolean;
    closeWithMask?: boolean;
}
interface ModalState {}

export class Modal extends Component<ModalProps, ModalState> {
    public static open = modalManager.open
    public static alert = modalManager.alert
    public static confirm = modalManager.confirm
    public static prompt = modalManager.prompt

    public static defaultProps: Partial<ModalProps> = {
        onOk: noop,
        onClose: noop,
        closeIcon: true,
        closeWithMask: true,
        renderMask: true,
        isMove: true,
        okText: '确定',
        closeText: '取消'
    };

    private portal = new CreatePortal();
    private bodyHidden = new BodyHidden();
    private contentRef: React.RefObject<HTMLDivElement> = createRef();
    private cachePosition = { x: 0, y: 0 };

    constructor (p) {
        super(p);
        bindAll(this, 'handleMove');
    }

    handleMove (e) {
        if (e.buttons > 0) {
            let { cachePosition } = this;
            let { movementX, movementY } = e.nativeEvent;
            cachePosition.x += movementX;
            cachePosition.y += movementY;

            this.contentRef
                .current!.style.transform = `translate(${cachePosition.x}px,${cachePosition.y}px)`;
        }
    }

    checkBodyHidden () {
        if (this.props.isVisible) {
            this.bodyHidden.open();
        } else {
            this.bodyHidden.cancel();
        }
    }

    getFooter () {
        let { footer, onOk, okText, onClose, closeText } = this.props;

        if (footer === null || (okText === null && closeText === null)) {
            return null;
        }

        if (typeof footer === 'undefined') {
            return (
                <div className='modal-footer'>
                    {closeText && <button onClick={onClose}>{closeText}</button>}
                    {okText && <button onClick={onOk}>{okText}</button>}
                </div>
            );
        }

        return <div className='modal-footer'>{footer}</div>;
    }

    getHeader () {
        let { title, isMove } = this.props;

        if (!title) {
            return null;
        }

        let className = 'modal-header';
        let props = isMove ? { className, onMouseMove: this.handleMove } : { className };

        return (
            <div {...props}>
                <span>{title}</span>
            </div>
        );
    }

    componentDidMount () {
        this.checkBodyHidden();
    }
    componentDidUpdate () {
        this.checkBodyHidden();
    }
    componentWillUnmount () {
        this.portal.destory();
        this.bodyHidden.cancel();
    }
    render () {
        let { title, renderMask, onClose, ...props } = this.props;

        let component = (
            <Togglable
                className={cls('modal', props.className)}
                isVisible={props.isVisible}
                isKeepDom={props.isKeepDom}
                animation='fadeInUp'
            >
                <div className='modal-content' ref={this.contentRef}>
                    {props.closeIcon && <CloseButton onClick={onClose} />}
                    {this.getHeader()}
                    <div className='modal-body'>{props.children}</div>
                    {this.getFooter()}
                </div>
                <div
                    className={cls('modal-mask', !renderMask && 'modal-mask-hidden')}
                    onClick={props.closeWithMask ? onClose : noop}
                />
            </Togglable>
        );

        return props.renderToPortal ? this.portal.renderPortal(component) : component;
    }
}
