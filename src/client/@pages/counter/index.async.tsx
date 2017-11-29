import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '@store/modules/counter';

class CounterPage extends React.Component<any, any> {
    render() {
        return <div>
            <h1>test page!!!!!{this.props.counter}</h1>
            <button onClick={this.props.inc}>inc</button>
            <button onClick={this.props.dec}>dec</button>
            <button onClick={this.props.async_inc}>async_inc</button>
            <button onClick={this.props.async_dec}>async_dec</button>
        </div>
    }
}

function mapStateToProps({ counter }) {
    return { counter };
}

export default connect(mapStateToProps, actions)(CounterPage);
