import React, { ReactElement } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import AuthenticateRoutes from './AuthenticateRoutes';
import Dashboard from '../views/Dashboard/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';

const Root = (): ReactElement => {
    return (
        <Switch>
            <AuthenticateRoutes path="/authenticate" />
            <ProtectedRoute
                component={(): ReactElement => (
                    <DashboardLayout component={Dashboard} />
                )}
                path="/dashboard"
            />
            <Redirect to="/authenticate/sign-in" />
        </Switch>
    );
};

export default Root;
