import { createElement, Component } from 'react';
import { Link } from 'react-router-dom';

import { AsyncComponent } from '@layouts/components/async.component';

const coms = [ 'icon', 'skin', 'togglable', 'alert', 'collapse', 'badge', 'countdown', 'position', 'popover' ];
const linkStyl = {
	paddingRight: 8,
	marginRight: 8,
	borderRight: '1px solid #ccc'
};
export default function ComponentPage({ match: { params: { name = coms[0] } } }) {
	return (
		<div>
			{coms.map((component) => (
				<Link key={component} to={`/component/${component}`} style={linkStyl}>
					{component}
				</Link>
			))}
			<AsyncComponent component={import(`./example/${name}`)} />
		</div>
	);
}
