import * as React from 'react';
import * as moment from 'moment';
import { Timer } from '@components';

export default class extends React.Component<any, any> {
	state = {
		time: moment('12:00:00', 'HH:mm:ss')
	};
	handleChange = (time) => {
		this.setState({ time });
	};
	render() {
		let { time } = this.state;
		return (
			<div>
				<h1>Timer:</h1>
				{time.format('HH:mm:ss')}
				<Timer defaultValue={time} disabledHours={[1,2,3]} onChange={this.handleChange} />
			</div>
		);
	}
}
