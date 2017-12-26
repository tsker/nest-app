import * as React from 'react';
import * as cls from 'classnames';
import './index.less';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

export class Button extends React.Component<ButtonProps> {
	render() {
		let { className } = this.props;

		return <button {...this.props} className={cls('button', className)} />;
	}
}
