import * as React from 'react';
import * as cls from 'classnames';
import './index.less';

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export class Input extends React.PureComponent<InputProps> {
	render() {
		let { className } = this.props;

		return <input {...this.props} className={cls('input', className)} />
	}
}
