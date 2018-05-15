import { createElement, Component } from 'react';
import { Alert } from '@components';

export default class AlertExample extends Component<any, any> {
	render() {
		return (
			<section>
				<Alert closeIcon onClose={() => console.log('alert close')} >
					<span>asdfasdf</span>
				</Alert>
				<Alert closeIcon>
					<h3>Alert</h3>
					<span>asdfasdf</span>
				</Alert>
			</section>
		);
	}
}
