import * as React from 'react';
import { Route, Link } from 'react-router-dom';

import { generateAsyncComponent as am } from './components/async.component';
import * as LoginPage from '@pages/auth/login/index.async';

class AuthLayout extends React.Component<any, any> {
	render() {
		return (
			<div id="app">
				<Route path="/auth/login" component={am(LoginPage)} />
			</div>
		);
	}
}

export default AuthLayout;
