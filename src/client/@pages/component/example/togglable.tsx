import { createElement, Component } from 'react';
import { Togglable } from '@components';

export default class AlertExample extends Component<any, any> {
	state = {
		show: false
	};
	render() {
		return (
			<section>
				<div onClick={() => this.setState({ show: !this.state.show })}>toggle</div>
				<Togglable isVisible={this.state.show}>
					<h2>asdfasdf</h2>
					<h2>asdfasdf</h2>
				</Togglable>
			</section>
		);
	}
}
