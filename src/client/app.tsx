import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { generateAsyncComponent } from './@components/async-component';
import HomePage from './@pages/home';
import * as TestPage from './@pages/test/index.async';

export class App extends React.Component<any, any> {
	render() {
		return (
			<BrowserRouter>
				<div id="app">
					<nav>
						<Link to="/">home</Link>
						<Link to="/test">test</Link>
					</nav>
					<Route exact path="/" component={HomePage} />
					<Route  path="/test" component={generateAsyncComponent(TestPage)} />
				</div>
			</BrowserRouter>
		);
	}
}
