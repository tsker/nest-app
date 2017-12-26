import * as React from 'react';

import InputDemo from './input.demo';
import ButtonDemo from './button.demo';
import SelectDemo from './select.demo';
import CheckboxDemo from './checkbox.demo';

export default class ComponentnsPage extends React.Component<any, any> {
	render() {
		return (
			<div style={{ width: 420, border: '1px solid #222', padding: 40 }}>
				<InputDemo />
				<ButtonDemo />
				<SelectDemo />
				<CheckboxDemo />
			</div>
		);
	}
}
