import { createElement, Component } from 'react';
import { Popover } from '@components';

export default class PopoverExample extends Component<any, any> {
	state = {
		placement: 'auto',
		types: [
			'auto-start',
			'auto',
			'auto-end',
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
		]
	};

	render() {
		return (
			<section>
				<div style={{ margin: 100 }}>
					<select
						style={{ margin: 50 }}
						onChange={(e) => this.setState({ placement: e.target.value })}
						value={this.state.placement}
					>
						{this.state.types.map((e) => (
							<option key={e} value={e}>
								{e}
							</option>
						))}
					</select>
					<Popover>
						<button>feichangadslkfjaslkfdjsadf</button>
						<div>asdfasdfieiakdf</div>
					</Popover>
				</div>
			</section>
		);
	}
}
