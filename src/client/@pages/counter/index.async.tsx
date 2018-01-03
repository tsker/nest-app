import * as React from 'react';
import { connect } from 'react-redux';
import { injectModule } from '@store';
import * as mod from './counter.module'

injectModule('counter', mod)
class CounterPage extends React.Component<any, any> {
    render() {
        return <div>
            <h1>{this.props.counter}</h1>
            <button onClick={this.props.inc}>inc</button>
            <button onClick={this.props.dec}>dec</button>
            <button onClick={this.props.asyncInc}>async_inc</button>
            <button onClick={this.props.asyncDec}>async_dec</button>
            <button onClick={this.props.intervalInc}>interval_inc</button>
        </div>
    }
}

function mapStateToProps({ counter }) {
    return { counter };
}

export default connect(mapStateToProps, mod.actions)(CounterPage);
