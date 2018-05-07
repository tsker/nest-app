import { createElement, Component } from 'react';
import { Icon } from '@components';

let icons = [
	'down',
	'right',
	'up',
	'left',
	'liebiao',
	'duihao',
	'search',
	'loading',
	'close',
	'reload'
];

export default class SkinExample extends Component<any, any> {
	render() {
		return <section>{icons.map((e) => <Icon key={e} type={e} />)}</section>;
	}
}
