import * as React from 'react';
import * as cls from 'classnames';
import './index.less';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
	loading?: boolean;
	skin?: 'default' | 'blue' | 'red';
}

export class Button extends React.Component<ButtonProps> {
	public static defaultProps = {
		type: 'button',
		skin: 'default'
	};
	render() {
		let { className, loading, disabled, skin, ...rest } = this.props;

		return (
			<button
				{...rest}
				className={cls('button button-' + skin, { 'button-loading': loading }, className)}
				disabled={disabled || loading}
			/>
		);
	}
}
