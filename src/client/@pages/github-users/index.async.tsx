import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '@store/modules/github-users';

class GithubUsersPage extends React.Component<any, any> {
	handleChange = (e) => {
		this.props.searchUsers(e.target.value);
	};

	render() {
		let { githubUsers } = this.props;
		return (
			<div>
				<input onChange={this.handleChange} />
				{githubUsers.map((e) => <h1>{e.login || e}</h1>)}
			</div>
		);
	}
}

function mapStateToProps({ githubUsers }) {
	return { githubUsers };
}

export default connect(mapStateToProps, actions)(GithubUsersPage);
