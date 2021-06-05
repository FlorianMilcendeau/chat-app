import React, { ReactElement, ComponentType, useEffect } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import type { Action } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';

/** Types */
import type { rootState } from '../../redux';

/** Actions */
import { verifyToken } from '../../redux/user/thunk';

import Auth from '../../Authentication/Authentication';

interface IProtectedRoute extends TConnectedProps {
    component: ComponentType<RouteComponentProps<any>>;
    path: string | string[];
}

const ProtectedRoute = ({
    component: Component,
    checkToken,
    ...rest
}: IProtectedRoute): ReactElement => {
    useEffect(() => {
        checkToken();
    }, []);

    return (
        <Route
            {...rest}
            render={(props) =>
                Auth.isAuthenticate ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/authenticate/sign-in' }} />
                )
            }
        />
    );
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
    checkToken: (): void => dispatch(verifyToken()),
});

const connector = connect(null, mapDispatchToProps);
type TConnectedProps = ConnectedProps<typeof connector>;

export default connector(ProtectedRoute);
