import * as React from 'react';
import { Route, Link } from 'react-router-dom';

import * as demos from './demo';

export default class ComponentnsPage extends React.Component<any, any> {
	render() {
		let list = [
			'Icon',
			'Tag',
			'Input',
			'Button',
			'Select',
			'Checkbox',
			'Radio',
			'Modal',
			'Popover',
			'Tooltip',
			'Calendar',
			'Timer',
			'Menu',
			'Dropdown'
		];
		return (
			<div>
				<nav>
					{list.map((k) => (
						<span key={k}>
							<Link to={'/components/' + k}>{k}</Link> |{' '}
						</span>
					))}
				</nav>
				<Route exact path={'/components'} component={demos['Input']} />
				{list.map((k) => <Route key={k} path={'/components/' + k} component={demos[k]} />)}
			</div>
		);
	}
}
