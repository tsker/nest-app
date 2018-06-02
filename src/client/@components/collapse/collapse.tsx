import { createElement, PureComponent, HtmlHTMLAttributes, ReactNode } from 'react';
import * as cls from 'classnames';

import { bindAll, noop } from '../util';
import { Togglable } from '../togglable';
import './collapse.less';

export interface CollapseProps extends HtmlHTMLAttributes<HTMLDivElement> {
    $key?: string | number;
    receiveKey?: any;

    header?: ReactNode;
    defaultIsOpen?: boolean;
    isOpen?: boolean;
    onChange?: any;
}

interface CollapseState {
    isOpen: boolean;
}

export class Collapse extends PureComponent<CollapseProps, CollapseState> {
    public static defaultProps: Partial<CollapseProps> = {
        defaultIsOpen: true,
        onChange: noop,
        receiveKey: false
    };
    public static getDerivedStateFromProps (nextProps, preState) {
        if ('isOpen' in nextProps && nextProps.isOpen !== preState.isOpen) {
            return { isOpen: nextProps.isOpen };
        }
        return null;
    }
    public state = {
        isOpen: this.props.defaultIsOpen as boolean
    };

    constructor (p) {
        super(p);
        bindAll(this, 'handleClick');
    }

    handleClick () {
        let isOpen = !this.state.isOpen;

        if (!('isOpen' in this.props)) {
            this.setState({ isOpen });
        }

        let { $key, receiveKey, onChange } = this.props;
        if (receiveKey) {
            receiveKey($key);
        } else {
            onChange(isOpen);
        }
    }

    render () {
        let { isOpen } = this.state;
        let { className, header, children, ...props } = this.props;

        if (header) {
            header = <div className='collapse-header'>{header}</div>;
        } else if (Array.isArray(children) && children.length > 1) {
            [ header, ...children ] = children as any[];
        }

        let rootCLs = cls('collapse', className, { 'collapse-open': isOpen });

        return (
            <div className={rootCLs}>
                {header && (
                    <div className='collapse-hd' onClick={this.handleClick}>
                        {header}
                    </div>
                )}
                <Togglable className='collapse-bd' isVisible={isOpen} children={children} />
            </div>
        );
    }
}
