import * as React from 'react';
import { Input, Button, Select, Checkbox } from '@components';

export default class extends React.Component<any, any> {
	render() {
		let options1 = [ '1', '2', '3' ];
		let options2 = [ { text: 'text1', value: '1' }, { text: 'text2', value: '2' } ];
		let options3 = { a: 'accc', b: 'bddd' };
		return (
			<div>
				<h1>Select</h1>
				<Select options={options1} />
				<Select options={options2} />
				<Select options={options3} />
			</div>
		);
	}
}
