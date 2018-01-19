import * as React from 'react';
import { Input, Button, Checkbox } from '@components';
import { Modal } from '@components/modal';

export default class extends React.Component<any, any> {
	state = {
		count: 0
	};
	handleClick = () => {
		// Modal.alert('test')
		this.setState({ count: this.state.count + 1 });
	};
	render() {
		return (
			<div>
				<h1>Button:{this.state.count}</h1>
				<Button onClick={this.handleClick}>fdf</Button>
				<Button onClick={this.handleClick}>fdf</Button>
				<Button onClick={this.handleClick}>fdf</Button>
				<Button disabled={true}>fdf</Button>
				<Button loading={true}>fdf</Button>
			</div>
		);
	}
}
