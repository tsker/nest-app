import { createElement, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { Icon } from './icon';
import './close-button.less';

export function CloseButton ({ className, ...props }: HtmlHTMLAttributes<HTMLSpanElement>) {
    return <Icon type='close' {...props} className={cls(className, 'close-button-icon')} />;
}
