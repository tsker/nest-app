import * as React from 'react';
import * as cls from 'classnames';
import './index.less';

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
	onChange?: any;
}
interface CheckboxState {
	checked?: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
	static defaultProps = {
		defaultChecked: false
	};
	constructor(p) {
		super(p);
		this.handleChange = this.handleChange.bind(this);
		let checked = this.hasCheckedInProps() ? p.checked : p.defaultChecked;
		this.state = { checked };
	}

	componentWillReceiveProps({ checked }) {
		if (this.hasCheckedInProps() && checked !== this.state.checked) {
			this.setState({ checked });
		}
	}

	handleChange() {
		let checked = !this.state.checked;
		if (!this.hasCheckedInProps()) {
			this.setState({ checked });
		}
		let { onChange } = this.props;
		onChange && onChange(checked);
	}

	hasCheckedInProps() {
		return 'checked' in this.props;
	}

	render() {
		let { className, children, name } = this.props;
		return (
			<label>
				<input
					name={name}
					type="checkbox"
					checked={this.state.checked}
					className={cls('checkbox', className)}
					onChange={this.handleChange}
				/>
				{children}
			</label>
		);
	}
}
