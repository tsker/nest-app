import { createElement, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';
import './divider.less';

interface DividerProps extends HtmlHTMLAttributes<HTMLDivElement> {
	dashed?: boolean;
	align?: 'left' | 'right';
}

export function Divider({ children, className, align, dashed, ...props }: DividerProps) {
	let classname = cls(
		'divider',
		className,
		align && `divider-align-${align}`,
		dashed && `divider-dashed`
	);

	return (
		<div className={classname} {...props}>
			{children && <span>{children}</span>}
		</div>
	);
}
