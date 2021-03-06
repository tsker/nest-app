import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import { injectModule } from '@store';
import * as githubUsers from './github-users.module';

injectModule('githubUsers', githubUsers);
class GithubUsersPage extends Component<any, any> {
	handleChange = (e) => {
		this.props.searchUsers(e.target.value);
	};

	render() {
		let { users, loading } = this.props;
		return (
			<div>
				<input onChange={this.handleChange} />
				{loading && <h1>loading...</h1>}
				{users && users.map((e) => <h1>{e.login || e}</h1>)}
			</div>
		);
	}
}

function mapStateToProps({ githubUsers }) {
	return { ...githubUsers };
}

export default connect(mapStateToProps, githubUsers.actions)(GithubUsersPage);
