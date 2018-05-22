import { createElement, Component } from 'react';
import { Route, Link } from 'react-router-dom';

import { generateAsyncComponent as am } from './components/async.component';
import AuthRoute from './components/auth-route';

import HomePage from '@pages/home';
import * as ComponentPage from '@pages/component/index.async';
import * as CounterPage from '@pages/counter/index.async';
import * as GithubUsersPage from '@pages/github-users/index.async';
import * as UcenterPage from '@pages/ucenter/index.async';
import * as ApolloPage from '@pages/apollo/index.async';

const menus = [ 'home', 'component', 'counter', 'github-users', 'ucenter','','apollo' ];
const navStyl={
	borderBottom:'1px solid #ccc',
	paddingBottom: 10,
	marginBottom: 10
}
const linkStyl = {
	paddingRight: 8,
	marginRight: 8,
	borderRight: '1px solid #ccc'
};

class MainLayout extends Component<any, any> {
	renderMenus() {
		return menus.map((menu, index) => (
			<Link key={index} style={linkStyl} to={`/${menu}`}>
				{menu}
			</Link>
		));
	}
	render() {
		return (
			<div id="app">
				<nav style={navStyl}>{this.renderMenus()}</nav>

				<div id="content">
					<Route exact path="/" component={HomePage} />
					<Route exact path="/home" component={HomePage} />
					<Route path="/component/:name?" component={am(ComponentPage)} />
					<Route path="/counter" component={am(CounterPage)} />
					<Route path="/github-users" component={am(GithubUsersPage)} />
					<AuthRoute path="/ucenter" component={am(UcenterPage)} />
					<Route path="/apollo" component={am(ApolloPage)} />
				</div>
			</div>
		);
	}
}

export default MainLayout;
