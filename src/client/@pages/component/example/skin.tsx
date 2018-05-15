import { createElement, Component } from 'react';

let skins = [ 'primary', 'blue', 'red', 'green', 'yellow', 'purple', 'dark' ];

export default class SkinExample extends Component<any, any> {
	render() {
		return (
			<section>
				{skins.map((e) =>
					[ e, `${e}-ghost`, `${e}-ghost skin-border` ].map((skin) => (
						<div key={skin} style={{ padding: 10, margin: 20 }} className={'skin-' + skin}>
							className <b>.skin-{skin.replace(' ', '.')}</b>
						</div>
					))
				)}
			</section>
		);
	}
}
