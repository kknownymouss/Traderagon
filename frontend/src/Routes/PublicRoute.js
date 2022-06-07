import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../Authentication/Auth';

const PublicRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            !isLogin() ?
                <Component {...props} />
            : <Redirect to="/market" />
        )} />
    )
};

export default PublicRoute;