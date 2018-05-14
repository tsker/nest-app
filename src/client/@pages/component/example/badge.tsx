import { createElement, Component } from 'react';
import { Badge } from '@components';

export default class BadgeExample extends Component<any, any> {
	render() {
		return (
			<section>
				<Badge>1</Badge>
				<Badge skin='red'>2 message</Badge>
			</section>
		);
	}
}
