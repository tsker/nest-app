import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './modal.less'

interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {}
interface ModalState {}

export class Modal extends PureComponent<ModalProps,ModalState> {
    public static defaultProps: Partial<ModalProps> = {};

    render() {
        return <div />;
    }
}
