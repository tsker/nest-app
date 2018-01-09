import * as React from 'react';
import * as moment from 'moment';

import { Calendar, DateRange } from '@components';

export default class extends React.Component<any, any> {
	state = {
		date: moment(),
		range:[moment(), moment()]
	};
	handleChange = (date) => {
		this.setState({ date });
	};
	render() {
		return (
			<div>
				<h1>Calendar</h1>
				<div style={{ width: '280px' }}>{this.state.date.format('YYYY-MM-DD HH:mm')}</div>
				<Calendar
					value={this.state.date}
					onChange={this.handleChange}
					disabledDate={(e) => e.isBefore(moment().add(-5, 'month'), 'date')}
				/>
				<h1>DateRange</h1>
				{this.state.range.map(e => e.format('YYYY-MM-DD HH:mm:ss')).join('------')}
				<DateRange value={this.state.range} onChange={range => this.setState({range})} />
			</div>
		);
	}
}
