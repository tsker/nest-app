import * as React from 'react';
import { BrowserRouter, HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MainLayout from './@layouts/main.layout';
import AuthLayout from './@layouts/auth.layout';

export default props => {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={AuthLayout} />
                <Route path="/" component={MainLayout} />
            </Switch>
        </Router>
    );
};
