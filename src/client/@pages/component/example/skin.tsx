import { createElement, Component } from 'react';

let skins = [
	'primary',
	'primary-line',
	'blue',
	'blue-line',
	'red',
	'red-line',
	'green',
	'green-line',
	'yellow',
	'yellow-line',
	'purple',
	'purple-line',
	'dark',
	'dark-line'
];

export default class SkinExample extends Component<any, any> {
	render() {
		return (
			<section>
				{skins.map((e) => (
					<div key={e} style={{ padding: 10, margin: 20 }} className={'skin-' + e}>
						className  <b>.skin-{e}</b>
					</div>
				))}
			</section>
		);
	}
}
