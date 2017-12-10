import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '@store/modules/github-users';

class GithubUsersPage extends React.Component<any, any> {
	handleChange = (e) => {
		this.props.searchUsers(e.target.value);
	};

	render() {
		let { users, loading } = this.props;
		return (
			<div>
				<input onChange={this.handleChange} />
				{loading && <h1>loading...</h1>}
				{users.map((e) => <h1>{e.login || e}</h1>)}
			</div>
		);
	}
}

function mapStateToProps({ githubUsers }) {
	return { ...githubUsers };
}

export default connect(mapStateToProps, actions)(GithubUsersPage);
