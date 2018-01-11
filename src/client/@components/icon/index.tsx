import * as React from 'react';
import * as cls from 'classnames';
import './index.less';

interface IconProps extends React.HTMLProps<HTMLSpanElement> {
	type?: string;
}

export function Icon({ type, className, ...rest }: IconProps) {
	let classname = cls('iconfont', 'icon-' + type, className);
	return <span className={classname} {...rest} />;
}
