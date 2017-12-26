import * as React from 'react';
import { Input, Button, Select, Checkbox } from '@components';

export default class extends React.Component<any, any> {
	state = {
		count:0
	};
	handleClick = () => {
		this.setState({ count: this.state.count + 1 });
	};
	render() {
		return (
			<div>
				<h1>Button:{this.state.count}</h1>
				<Button onClick={this.handleClick}>fdf</Button>
			</div>
		);
	}
}
