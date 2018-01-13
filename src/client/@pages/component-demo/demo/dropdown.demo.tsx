import * as React from 'react';
import { Input, Button, Select, Checkbox, Modal, Dropdown } from '@components';

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
				<h1>Dropdown</h1>
				<Dropdown
					placement="bottom-start"
					content={
						<ul>
							<li>asdf</li>
						</ul>
					}
				>
					<button>asdf</button>
				</Dropdown>
			</div>
		);
	}
}
