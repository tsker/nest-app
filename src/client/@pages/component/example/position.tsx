import { createElement, Component } from 'react';
import { Position } from '@components';

export default class PositionExample extends Component<any, any> {
	state = {
		placement: 'bottom',
		types: [
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
				<div style={{ height: 1000, background: '#eee' }} />
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
					<hr />
					<Position>
						<Position.Reference>
							{({ getReferenceRef }) => (
								<button ref={getReferenceRef} style={{ marginLeft: 500 }}>
									reference
								</button>
							)}
						</Position.Reference>
						<Position.Popper placement="bottom">
							{({ getPopperRef }) => (
								<div ref={getPopperRef}>
									<div style={{ background: '#aaa' }}>
										<div>sasdfasdfasdfvsa</div>
										<div>sasdfasdfasdfvsa</div>
										<div>sasdfasdfasdfvsa</div>
										<div>sasdfasdfasdfvsa</div>
									</div>
								</div>
							)}
						</Position.Popper>
					</Position>
				</div>
				<div style={{ height: 3000, background: '#eee' }} />
				<div>
					ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
				</div>
			</section>
		);
	}
}
