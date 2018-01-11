import * as React from 'react';

import InputDemo from './demo/input.demo';
import ButtonDemo from './demo/button.demo';
import SelectDemo from './demo/select.demo';
import CheckboxDemo from './demo/checkbox.demo';
import RadioDemo from './demo/radio.demo';
import ModalDemo from './demo/modal.demo';
import PopoverDemo from './demo/popover.demo';
import TooltipDemo from './demo/tooltip.demo';
import CalendarDemo from './demo/calendar.demo';
import TimerDemo from './demo/timer.demo';
import IconDemo from './demo/icon.demo';

export default class ComponentnsPage extends React.Component<any, any> {
	render() {
		return (
			<div style={{ width: 900, border: '1px solid #222', padding: 40 }}>
			<IconDemo/>
				<TimerDemo />
				<CalendarDemo />
				<PopoverDemo />
				<TooltipDemo />
				<InputDemo />
				<ButtonDemo />
				<SelectDemo />
				<CheckboxDemo />
				<RadioDemo />
				<ModalDemo />
			</div>
		);
	}
}
