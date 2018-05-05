import { createElement, Component } from 'react';

export default class TestPage extends Component<any, any> {
	render() {
		return (
			<div>
				<h1 draggable onDragStart={console.log}>
					test page!!
				</h1>
			</div>
		);
	}
}
