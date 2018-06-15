import { createElement, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './icon.less';

interface IconProps extends HtmlHTMLAttributes<HTMLSpanElement> {
    type: string;
}

export function Icon ({ type, className, ...props }: IconProps) {
    return <span className={cls('iconfont', `icon-${type}`, className)} {...props} />;
}
