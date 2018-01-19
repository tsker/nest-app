import * as React from 'react';
import { Select } from '@components';

let options1 = Array(1000).fill('').map((_, i) => 'text' + i);
let options2 = [
	{ text: '好吧1', value: 1 },
	{ text: '好吧2', value: '2' },
	{ text: 'text3', value: '3' },
	{ text: 'text4', value: '4' },
	{ text: 'text5', value: '5' },
	{ text: 'text6', value: '6' },
	{ text: 'text7', value: '7' },
	{ text: 'text8', value: '8' },
	{ text: 'text9', value: '9' },
	{ text: 'text10', value: '10' },
	{ text: 'text11', value: '11' },
	{ text: 'text12', value: '12' },
	{ text: 'text13', value: '13' }
];
let options3 = { a: 1, b: 'bddd' };

export default class extends React.Component<any, any> {
	state = { value: '', t1:['text1','text2','text3','text4'] };
	handleChange = (e) => {
		this.setState({ value: e.target.value });
	};
	handleSelectChange = (value, name) => {
		this.setState({ [name]: value });
	};
	render() {
		let { state } = this;
		let { value } = state;

		return (
			<div>
				<h1>SelectNative: {value}</h1>
				<span onClick={() => this.setState({})}>update</span>
				<h1>Select: {value}</h1>
				<div style={{ display: 'flex' }}>
					<div>
						<h3>value:{state['t1']}</h3>
						<Select
							name="t1"
							mode="multiple"
							value={state['t1']}
							options={options1}
							onChange={this.handleSelectChange}
							filter
						/>
					</div>
					<div>
						<h3>value:{state['t2']}</h3>
						<Select
							name="t2"
							mode="multiple"
							value={state['t2']}
							options={options2}
							onChange={this.handleSelectChange}
						/>
					</div>
					<div>
						<h3>value:{state['t4']}</h3>
						<Select name="t4" value={state['t4']} onChange={this.handleSelectChange}>
							<Select.Option value="1111111111">test123</Select.Option>
							<Select.Option value="222222222">
								<span>asdfasf</span>test
							</Select.Option>
						</Select>
					</div>
				</div>
			</div>
		);
	}
}
