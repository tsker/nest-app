import * as React from 'react';
import * as cls from 'classnames';
import './index.less';
import { Icon } from '..';

interface TagProps extends React.HTMLProps<HTMLDivElement> {
	skin?: string;
	close?: boolean;
}

export class Tag extends React.PureComponent<TagProps> {
	public static defaultProps = {
		skin: 'primary'
	};
	render() {
		let { className, children, skin, close, ...props } = this.props;

		return (
			<div className={cls('tag', { 'tag-close': close }, 'skin-' + skin, className)} {...props}>
				{children}
			</div>
		);
	}
}
