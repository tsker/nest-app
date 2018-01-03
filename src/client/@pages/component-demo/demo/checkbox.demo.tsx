import * as React from 'react';
import { Input, Button, Select, Checkbox, CheckboxGroup } from '@components';

export default class extends React.Component<any, any> {
    state = {
        on: false,
        selects: ['value1']
    };
    handleChange = e => {
        this.setState({ on: e.target.checked });
    };
    handleChange2 = e => {
        console.log(e.target.checked, e.target.value);
    };
    handleChange3 = selects => {
        this.setState({ selects });
    };
    render() {
        return (
            <div>
                <h1>Checkbox:{this.state.on ? 'on' : 'off'}</h1>
                <Checkbox
                    defaultChecked={true}
                    onChange={this.handleChange2}
                    children="adf"
                />
                <Checkbox checked={this.state.on} onChange={this.handleChange}>
                    check2
                </Checkbox>
                <CheckboxGroup
                    defaultValue={['value1']}
                    options={[
                        { value: 'value1', text: 'value1' },
                        { value: 'value2', text: 'value2' }
                    ]}
                    onChange={this.handleChange3}
                />
                <CheckboxGroup
                    value={this.state.selects}
                    onChange={this.handleChange3}
                    options={[
                        { value: 'value1', text: 'value1' },
                        { value: 'value2', text: 'value2' }
                    ]}
                />
            </div>
        );
    }
}
