import * as React from 'react';
import { Input, Button, SelectNative, Select, Checkbox } from '@components';

let options1 = ['text1', 'text2', 'text3', 'text4'];
let options2 = [
    { text: '好吧1', value: '1' },
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
let options3 = { a: 'accc', b: 'bddd' };

export default class extends React.Component<any, any> {
    state = { value: '' };
    handleChange = e => {
        this.setState({ value: e.target.value });
    };
    handleSelectChange = value => {
        this.setState({ value });
    };
    render() {
        let { value } = this.state;

        return (
            <div>
                <h1>SelectNative: {value}</h1>
                <SelectNative value={value} options={options1} onChange={this.handleChange} />
                <SelectNative value={value} options={options2} onChange={this.handleChange} />
                <SelectNative value={value} options={options3} onChange={this.handleChange} />
                <h1>Select: {value}</h1>
                <div style={{}}>
                    <Select mode="multiple" value={value} options={options2} onChange={this.handleSelectChange}>
                        <Select.Option value="asdf" disabled>
                            test
                        </Select.Option>
                        <Select.Option value="asdf123" text="asdf">
                            test
                        </Select.Option>
                    </Select>
                    <Select mode="multiple" value={value} options={options2} onChange={this.handleSelectChange} />
                    <Select mode="input" value={value} options={options1} onChange={this.handleSelectChange} />
                    <Select defaultValue={value}>
                        <Select.Option value="asdf" disabled>
                            test
                        </Select.Option>
                        <Select.Option value="asdf123">test</Select.Option>
                    </Select>
                </div>
            </div>
        );
    }
}
