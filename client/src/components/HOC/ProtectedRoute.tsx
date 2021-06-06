import React, { ReactElement, ComponentType } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import Auth from '../../Authentication/Authentication';

interface IProtectedRoute {
    component: ComponentType<RouteComponentProps<any>>;
    path: string | string[];
}

const ProtectedRoute = ({
    component: Component,
    ...rest
}: IProtectedRoute): ReactElement => (
    <Route
        {...rest}
        render={(props) =>
            Auth.isAuthenticate || Auth.isTokenExpired ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/authenticate/sign-in' }} />
            )
        }
    />
);

export default ProtectedRoute;
