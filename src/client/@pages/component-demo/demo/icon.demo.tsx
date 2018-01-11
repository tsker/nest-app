import * as React from 'react';
import * as moment from 'moment';
import { Icon } from '@components';

export default class extends React.Component<any, any> {
	render() {
		return (
			<div>
				<h1>Icon</h1>
				{[
					'down',
					'right',
					'up',
					'left',
					'liebiao',
					'duihao',
					'search',
					'loading',
					'close',
					'reload'
				].map((type) => Icon({ type }))}
			</div>
		);
	}
}
