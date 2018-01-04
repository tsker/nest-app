import * as React from 'react';
import { Input, Button, Select, Checkbox } from '@components';

export default class extends React.Component<any, any> {
    state = { value: 0 };
    handleChange = e => {
        this.setState({ value: e.target.value });
    };
    render() {
        let options1 = ['1', '2', '3','4'];
        let options2 = [
            { text: 'text1', value: '1' },
            { text: 'text2', value: '2' }
        ];
        let options3 = { a: 'accc', b: 'bddd' };
        return (
            <div>
                <h1>Select: {this.state.value}</h1>
                <Select value={this.state.value} options={options1} onChange={this.handleChange} />
                <Select value={this.state.value} options={options2} onChange={this.handleChange} />
                <Select value={this.state.value} options={options3} onChange={this.handleChange} />
            </div>
        );
    }
}
