import React, { ReactElement } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import ProtectedRoute from '../HOC/ProtectedRoute';
import AuthenticateRoutes from './AuthenticateRoutes';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Channel from '../views/Channel/Channel';

const Root = (): ReactElement => {
    return (
        <Switch>
            <AuthenticateRoutes path="/authenticate" />
            <ProtectedRoute
                component={(): ReactElement => (
                    <MainLayout component={Channel} />
                )}
                path="/channel/:id"
            />
            <Redirect to="/authenticate/sign-in" />
        </Switch>
    );
};

export default Root;
