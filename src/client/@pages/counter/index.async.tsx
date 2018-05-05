import { createElement } from 'react';
import { connect } from 'react-redux';
import { injectModule } from '@store';
import * as mod from './counter.module';

injectModule('counter', mod);

function CounterPage(props) {
	return (
		<div>
			<h1>{props.counter}</h1>
			<button onClick={props.inc}>inc</button>
			<button onClick={props.dec}>dec</button>
			<button onClick={props.asyncInc}>async_inc</button>
			<button onClick={props.asyncDec}>async_dec</button>
			<button onClick={props.intervalInc}>interval_inc</button>
		</div>
	);
}

function mapStateToProps({ counter }) {
	return { counter };
}

export default connect(mapStateToProps, mod.actions)(CounterPage);
