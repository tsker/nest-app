import * as React from 'react';
import { Input, Button, Select, Checkbox } from '@components';
import { Modal } from '@components';
import { delay } from '@util';

let index = 0;
function moreModal() {
	let options = {
        title:'modal title ' + index,
		content: (
			<div>
				<span onClick={moreModal}>click me {index++}, </span>
				{Array(index).fill('').map((e, i) => <p>{'string '.repeat(i*5)}</p>)}
			</div>
		)
	};
	Modal.open(options);
}

export default class extends React.Component<any, any> {
	constructor(p) {
		super(p);
	}
	state = {
		open: false
	};
	handleClick = () => {
		this.setState({ open: !this.state.open });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	handleConfirm = () => {
		return true;
	};
	render() {
		return (
			<div>
				<h1>Modal:{this.state.open ? 'on' : 'off'}</h1>
				<span onClick={this.handleClick}>modal</span> |
				<span onClick={() => Modal.alert('alert msg', 'alet title')}>alert</span> |
				<span
					onClick={() =>
						Modal.confirm(
							'confirm msg',
							'confirm',
							() => Promise.resolve(delay(2e3))
						)}
				>
					confirm
				</span>
				|
				<span onClick={moreModal}>open</span>
				<Modal
					title="modal"
					visible={this.state.open}
					onClose={this.handleClose}
					onConfirm={this.handleConfirm}
				>
					<div>line1</div>
					<div>line2</div>
					<div>line3</div>
					<div>line4</div>
				</Modal>
			</div>
		);
	}
}
