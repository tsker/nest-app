import { createElement, Component } from 'react';
import { Collapse, Arrordion, Divider } from '@components';

export default class AlertExample extends Component<any, any> {
	state = {
		collapse: false,
		arrordion: [ 'asdf' ]
	};

	render() {
		let content = (
			<div style={{background:'#eee'}}>
				<div>content</div>
				<div>content</div>
				<div>content</div>
				<div>content</div>
				<div>content</div>
				<div>content</div>
				<div>content</div>
				<div>content</div>
			</div>
		);
		return (
			<section>
				<Collapse
					header="collapse"
					isOpen={this.state.collapse}
					onChange={(collapse) => this.setState({ collapse })}
				>
					{content}
				</Collapse>

				<Divider />

				<Arrordion
					mode="multiple"
					activeKeys={this.state.arrordion}
					onChange={(arrordion) => this.setState({ arrordion })}
				>
					<Collapse key="asdf" header="Arrordion0">
						{content}
					</Collapse>
					<Collapse key="11" header="Arrordion0">
						{content}
					</Collapse>
				</Arrordion>

				<Divider />

				<Arrordion onChange={console.log}>
					<Collapse key="asdf" header='Arrordion1'>
						{content}
					</Collapse>
					<Collapse key="11" header='Arrordion1'>
						{content}
					</Collapse>
					<Collapse key="121">
						<b className="header">custome header Arrordion1</b>
						{content}
					</Collapse>
				</Arrordion>
			</section>
		);
	}
}
