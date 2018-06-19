import { createElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Popover } from '@components';
let types = [
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start'
];
function ChangePlacement ({ defaultValue, name, onChange, ...rest }: any) {
    return (
        <select
            style={{ margin: 50 }}
            onChange={(e) => onChange(name, e.target.value)}
            defaultValue={defaultValue}
            {...rest}
        >
            {types.map((e) => (
                <option key={e} value={e}>
                    {e}
                </option>
            ))}
        </select>
    );
}

export default class PopoverExample extends Component<any, any> {
    state: { p1: any; p2: any; show: boolean } = {
        p1: 'top',
        p2: 'top',
        show: true
    };

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };

    renderSelect (key) {
        return (
            <ChangePlacement
                name={key}
                defaultValue={this.state[key]}
                onChange={this.handleChange}
            />
        );
    }

    render () {
        return (
            <section>
                <div style={{ padding: 100 }}>
                    <button onClick={() => this.setState({ show: true })}>show</button>
                    <button onClick={() => this.setState({ show: false })}>hide</button>
                    <Popover arrow isShow={this.state.show} placement={this.state.p1}>
                        {this.renderSelect('p1')}
                        <div style={{ padding: 10 }}>XXXXXXXXX</div>
                    </Popover>

                    <Popover arrow placement={this.state.p2} trigger='hover'>
                        {this.renderSelect('p2')}
                        <div style={{ padding: 10 }}>p2p2p2p2p2p2p2p</div>
                    </Popover>

                    <Popover placement='bottom-start' trigger='click'triggerPopover={false}>
                        <input />
                        <div style={{ padding: 10 }}>
                            <input />
                        </div>
                    </Popover>
                    <div style={{height:1000}}></div>
                </div>
            </section>
        );
    }
}
