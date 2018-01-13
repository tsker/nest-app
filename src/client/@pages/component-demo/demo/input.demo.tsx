import * as React from 'react';
import { Input, Button,  Checkbox } from '@components';

export default class extends React.Component<any, any> {
	state = {
		text: '',
		msg: ''
	};
	handleChange(name) {
		return (e) => this.setState({ [name]: e.target.value });
	}
	handleMsg = (msg) => {
		return () => this.setState({ msg });
	};
	render() {
		let { text, msg } = this.state;
		return (
			<div>
				<h1>
					Input:{msg||'状态'}:{text}
				</h1>
				<Input
					value={this.state.text}
					onChange={this.handleChange('text')}
					onFocus={this.handleMsg('激活')}
					onBlur={this.handleMsg('取焦')}
				/>
			</div>
		);
	}
}
