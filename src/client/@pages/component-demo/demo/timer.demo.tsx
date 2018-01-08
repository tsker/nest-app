import * as React from 'react';
import * as moment from 'moment';
import { Timer } from '@components';

export default class extends React.Component<any, any> {
	state = {
		time: moment('12:00:00', 'HH:mm:ss'),
		range: [ moment(), moment().add(1, 'hours') ]
	};
	handleChange = (time) => {
		this.setState({ time });
	};
	render() {
		let { time, range } = this.state;
		return (
			<div>
				<h1>Timer:{time.format('HH:mm:ss')}</h1>
				<Timer hiddenDisable defaultValue={time} disabledHours={[ 0, 1, 2, 3 ]} onChange={this.handleChange} />
			</div>
		);
	}
}
