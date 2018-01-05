import * as React from 'react';
import * as moment from 'moment';

import { Calendar } from '@components';

export default class extends React.Component<any, any> {
	state = {
		date: moment(),
		date1: moment()
	};
	handleChange = (date) => {
		this.setState({ date });
	};
	handleChange1 = (date1) => {
		this.setState({ date1 });
	};
	render() {
		return (
			<div>
				<h1>Calendar</h1>
				<div style={{ display: 'flex' }}>
					<div style={{ width: '280px' }}>{this.state.date.format('YYYY-MM-DD')}</div>
					<div style={{ width: '280px' }}>{this.state.date1.format('YYYY-MM-DD')}</div>
				</div>

				<div style={{ display: 'flex' }}>
					<Calendar value={this.state.date} onChange={this.handleChange} timerOption={{ seconds: false }} />
					<Calendar onChange={this.handleChange1} />
				</div>
			</div>
		);
	}
}
