import { createElement, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './badge.less';

interface BadgeProps extends HtmlHTMLAttributes<HTMLSpanElement> {
    skin?: string;
    dot?: boolean;
}

export function Badge ({ className, skin = 'primary', dot, ...props }: BadgeProps) {

    const classname = cls(dot ? 'badge-dot' : 'badge', `skin-${skin}`, className);
    return <span className={classname} {...props} />;

}
