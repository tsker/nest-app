import { createElement, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './badge.less';

interface BadgeProps extends HtmlHTMLAttributes<HTMLSpanElement> {
	skin?: string;
}

export function Badge({ className, skin = 'primary', ...props }: BadgeProps) {
	return <span className={cls('badge', `skin-${skin}`, className)} {...props} />;
}
