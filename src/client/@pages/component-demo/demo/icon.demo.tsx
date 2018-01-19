import * as React from 'react';
import * as moment from 'moment';
import { Icon } from '@components';

export default class extends React.Component<any, any> {
	public static defaultProps = {
		types: [ 'down', 'right', 'up', 'left', 'liebiao', 'duihao', 'search', 'loading', 'close', 'reload' ]
	};
	render() {
		return (
			<div>
				<h1>Icon</h1>
				{this.props.types.map((type) => <Icon type={type} key={type} />)}
			</div>
		);
	}
}
