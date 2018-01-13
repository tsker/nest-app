import * as React from 'react';
import * as cls from 'classnames';
import * as noop from 'lodash/noop';
import { renderSafeOptions, toType, eachBind } from '../util';
import { BaseElement } from '../type';
import { Popover } from '..';
import './option.less';
import { Icon } from '..';

interface OptionProps extends BaseElement {
    option?: object;
    text?: any;
}

export function Option({ text, children, disabled, checked, className, onClick }: OptionProps) {
    let classname = cls('select-option', { disabled }, { checked }, className);
    return (
        <div className={classname} onClick={onClick}>
            <div className="label">{children || text}</div>
            {checked && <Icon type="duihao" />}
        </div>
    );
}
