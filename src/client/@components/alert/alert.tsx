import { createElement, Component, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { bindAll, noop } from '../util';
import { Togglable } from '../togglable';
import { Icon } from '../icon';
import './alert.less';

interface AlertProps extends HtmlHTMLAttributes<HTMLDivElement> {
    closeIcon?: boolean;
    onClose?: any;
    skin?: string;
}
interface AlertState {
    isShow: boolean;
    closed: boolean;
}

export class Alert extends Component<AlertProps, AlertState> {
    public static defaultProps: Partial<AlertProps> = {
        closeIcon: false,
        onClose: noop,
        skin: 'dark-ghost'
    };

    state = {
        isShow: true,
        closed: false
    };

    constructor (p) {
        super(p);
        bindAll(this, 'handleClose', 'handleDone');
    }

    handleClose () {
        this.setState({ isShow: false });
    }
    handleDone () {
        this.setState({ closed: true }, this.props.onClose);
    }

    render () {
        let { closeIcon, className, skin } = this.props;
        let { isShow, closed } = this.state;

        if (closed) {
            return null;
        }

        return (
            <Togglable
                className={cls('alert', className, 'skin-' + skin)}
                isVisible={isShow}
                onDone={this.handleDone}
                isEnterWithMounted={false}
            >
                {closeIcon && <Icon type='close' onClick={this.handleClose} />}
                <div className='alert-content'>{this.props.children}</div>
            </Togglable>
        );
    }
}
