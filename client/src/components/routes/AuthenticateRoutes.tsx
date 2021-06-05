import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';

/** Components */
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import SignIn from '../views/authenticate/signIn/SignIn';
import SignUp from '../views/authenticate/SignUp/SignUp';

interface props {
    path: string;
}

const AuthenticateRoutes = ({ path }: props): ReactElement => {
    return (
        <>
            <Route
                path={`${path}/sign-up`}
                component={() => <HomeLayout component={SignUp} />}
            />
            <Route
                path={`${path}/sign-in`}
                component={() => <HomeLayout component={SignIn} />}
            />
        </>
    );
};

export default AuthenticateRoutes;
