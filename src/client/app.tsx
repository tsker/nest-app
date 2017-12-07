import * as React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';

import { generateAsyncComponent as am } from './@components/async-component';
import HomePage from './@pages/home';
import * as TestPage from './@pages/test/index.async';
import * as CounterPage from './@pages/counter/index.async';
import * as GithubUsersPage from './@pages/github-users/index.async';

export class App extends React.Component<any, any> {
	render() {
		return (
			<HashRouter>
				<div id="app">
					<nav>
						<Link to="/">home</Link> |
						<Link to="/test">test</Link> |
						<Link to="/counter">counter</Link> |
						<Link to="/github-users">github-users</Link>
					</nav>
					<Route exact path="/" component={HomePage} />
					<Route path="/test" component={am(TestPage)} />
					<Route path="/counter" component={am(CounterPage)} />
					<Route path="/github-users" component={am(GithubUsersPage)} />
				</div>
			</HashRouter>
		);
	}
}
