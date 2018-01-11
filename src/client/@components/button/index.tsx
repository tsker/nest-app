import * as React from 'react';
import * as cls from 'classnames';
import './index.less';
import { Icon } from '..';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
	loading?: boolean;
	skin?: 'default' | 'blue' | 'red';
}

export class Button extends React.PureComponent<ButtonProps> {
	public static defaultProps = {
		type: 'button',
		skin: 'default'
	};
	render() {
		let { className, loading, disabled, skin,children, ...rest } = this.props;

		return (
			<button
				{...rest}
				className={cls('button button-' + skin, { 'button-loading': loading }, className)}
				disabled={disabled || loading}
			>{loading&&<Icon type='loading' className='icon-rotate'/>}{children}</button>
		);
	}
}
