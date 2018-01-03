import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as pick from 'lodash/pick';

interface LoginedProps {
    logined: boolean;
}

function AuthRoute({ logined, component, ...rest }: LoginedProps & RouteProps) {
    const Component: any = component;
    return (
        <Route
            {...rest}
            render={props =>
                logined ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function mapStateToProps({ auth }): LoginedProps {
    return pick(auth, 'logined');
}

export default connect(mapStateToProps)(AuthRoute);
