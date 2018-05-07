import { createElement, Component } from 'react';
import { Collapse, Arrordion, Divider } from '@components';

export default class AlertExample extends Component<any, any> {
	state = {
		collapse: false,
		arrordion: [ 'asdf' ]
	};
	render() {
		return (
			<section>
				<Collapse
					isOpen={this.state.collapse}
					onChange={(collapse) => this.setState({ collapse })}
				>
					<div className="header">collapse</div>
					<h2>sdfasdf</h2>
				</Collapse>

				<Divider />

				<Arrordion
					mode="multiple"
					activeKeys={this.state.arrordion}
					onChange={(arrordion) => this.setState({ arrordion })}
				>
					<Collapse key="asdf">
						<div className="header">Arrordion0</div>
						<h2>sdfasdf</h2>
					</Collapse>
					<Collapse key="11">
						<div className="header">Arrordion0</div>
						<h2>sdfasdf</h2>
					</Collapse>
				</Arrordion>

				<Divider />

				<Arrordion onChange={console.log}>
					<Collapse key="asdf">
						<div className="header">Arrordion1</div>
						<h2>sdfasdf</h2>
					</Collapse>
					<Collapse key="11">
						<div className="header">Arrordion1</div>
						<h2>sdfasdf</h2>
					</Collapse>
				</Arrordion>
			</section>
		);
	}
}
