import * as React from 'react';
import { Route, Link } from 'react-router-dom';

import { generateAsyncComponent as am } from '@components';
import AuthRoute from "./components/auth-route";

import HomePage from '@pages/home';
import * as TestPage from '@pages/test/index.async';
import * as CounterPage from '@pages/counter/index.async';
import * as GithubUsersPage from '@pages/github-users/index.async';
import * as ComponentsPage from '@pages/component-demo/index.async';
import * as UcenterPage from '@pages/ucenter/index.async';

class MainLayout extends React.Component<any, any> {
	render() {
		return (
			<div id="app">
				<nav>
					<Link to="/">home</Link> |
					<Link to="/test">test</Link> |
					<Link to="/counter">counter</Link> |
					<Link to="/github-users">github-users</Link> |
					<Link to="/componnets">componnets</Link>
					<Link to="/ucenter">ucenter</Link>
				</nav>
				<Route exact path="/" component={HomePage} />
				<Route path="/test" component={am(TestPage)} />
				<Route path="/counter" component={am(CounterPage)} />
				<Route path="/github-users" component={am(GithubUsersPage)} />
				<Route path="/componnets" component={am(ComponentsPage)} />
				<AuthRoute path="/ucenter" component={am(UcenterPage)} />
			</div>
		);
	}
}

export default MainLayout;
