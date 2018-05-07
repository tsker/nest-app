import { createElement, Component } from 'react';
import { Alert } from '@components';

export default class AlertExample extends Component<any, any> {
	render() {
		return (
			<section>
				<Alert closeIcon onClose={() => console.log('alert close')} className="skin-blue">
					asdfasdf
				</Alert>
				<Alert>asdfasdf</Alert>
			</section>
		);
	}
}
