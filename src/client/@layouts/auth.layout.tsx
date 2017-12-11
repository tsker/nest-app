import * as React from 'react';
import { Route, Link } from 'react-router-dom';

import { generateAsyncComponent as am } from '@components';
import * as LoginPage from '@pages/auth/login/index.async';

class MainLayout extends React.Component<any, any> {
	render() {
		return (
			<div id="app">
				<Route path="/auth/login" component={am(LoginPage)} />
			</div>
		);
	}
}

export default MainLayout;
