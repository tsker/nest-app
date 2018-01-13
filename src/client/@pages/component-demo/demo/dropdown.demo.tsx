import * as React from 'react';
import {  Dropdown } from '@components';
import { Link } from 'react-router-dom';

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
				<Dropdown placement="bottom-start" target={<button>asdf</button>}>
					<Link to='/components/Input'>input</Link>
					<p onClick={() => console.log('click')}>aasdf</p>
					asdf
					&nbsp;
					asdf &nbsp;
				</Dropdown>
			</div>
		);
	}
}
