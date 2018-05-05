import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import pick from 'lodash-es/pick';

import { actions } from '@store/modules/auth';
import { alway } from '@util';

class UcenterPage extends Component<any, any> {
	render() {
		return (
			<div>
				<h1>UcenterPage</h1>
				<a href="javascript:;" onClick={this.props.logout}>
					logout
				</a>
			</div>
		);
	}
}

export default connect(alway({}), pick(actions, 'logout'))(UcenterPage);
