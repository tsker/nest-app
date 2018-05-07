import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './icon.less';

interface IconProps extends HtmlHTMLAttributes<HTMLSpanElement> {
	type: string;
}

export function Icon({ type, className, ...props }: IconProps) {
	return <span className={cls('iconfont', className, `icon-${type}`)} {...props} />;
}
