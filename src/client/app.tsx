import { createElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainLayout from './@layouts/main.layout';
import AuthLayout from './@layouts/auth.layout';
import './app.less';

export default (props) => {
    return (
        <Switch>
            <Route path='/auth' component={AuthLayout} />
            <Route path='/' component={MainLayout} />
        </Switch>
    );
};
