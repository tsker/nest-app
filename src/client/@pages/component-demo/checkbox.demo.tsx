import * as React from 'react';
import { Input, Button, Select, Checkbox } from '@components';

export default class extends React.Component<any, any> {
	state = {
		on: false
	};
	handleChange = (checked) => {
		console.log(checked);

		this.setState({ on: checked });
	};
	render() {
		return (
			<div>
				<h1>Checkbox:</h1>
				<Checkbox defaultChecked={true} >asdfasdf</Checkbox>
				<Checkbox onChange={this.handleChange} >asdfasdf</Checkbox>
				<Checkbox defaultChecked={true} onChange={this.handleChange} >asdfasdf</Checkbox>
				<Checkbox checked={this.state.on} onChange={this.handleChange} >asdfasdf</Checkbox>
				<Checkbox
					defaultChecked={true}
					checked={this.state.on}
					onChange={this.handleChange}
				>asdfasdf</Checkbox>
			</div>
		);
	}
}
