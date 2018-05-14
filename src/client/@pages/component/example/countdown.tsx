import { createElement, Component } from 'react';
import { Countdown } from '@components';

export default class AlertExample extends Component<any, any> {
	render() {
		return (
			<section>
				<div>count:: <Countdown count={1000}  onDone={() => console.log(1,'done')}/></div>
				<div>count:: <Countdown count={5} endCount={-5} onDone={() => console.log(2,'done')}/></div>

				<div>time count:: <Countdown mode='time' count={30}  onDone={() => console.log(3,'done')}/></div>
				<div>time count:: <Countdown mode='time' endDate='2018-5-14 18:00:00'  onDone={() => console.log(4,'done')}/></div>
				<div>time count:: <Countdown mode='time' endDate={new Date('2018-5-14 18:00:00')}  onDone={() => console.log(5,'done')}/></div>
				<div>time count:: <Countdown mode='time' count={7*24*60*60}  onDone={() => console.log(6,'done')}/></div>


			</section>
		);
	}
}
