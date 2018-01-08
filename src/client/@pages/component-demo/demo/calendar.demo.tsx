import * as React from 'react';
import * as moment from 'moment';

import { Calendar } from '@components';

export default class extends React.Component<any, any> {
	state = {
		date: moment(),
	};
	handleChange = (date) => {
		this.setState({ date });
	};
	render() {
		return (
			<div>
				<h1>Calendar</h1>
				<div style={{ width: '280px' }}>{this.state.date.format('YYYY-MM-DD HH:mm')}</div>
				<Calendar value={this.state.date} onChange={this.handleChange} />
			</div>
		);
	}
}
