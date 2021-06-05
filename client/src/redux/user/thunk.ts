import { Action, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';

/** Types */
import type { ResponseAuth, User, UserLogin, UserRegister } from './types';
import type { INotify } from '../notification/types';
import type { rootState } from '..';

/** Actions */
import { setToken } from '../env/actions';
import { setNotify } from '../notification/actions';
import { setUserSuccess, startLoadingUser, stopLoadingUser } from './action';
import { connectSocket, joinChannel } from '../socket/actions';

import api from '../../utils/http';
import Authentication from '../../Authentication/Authentication';

/**
 *  Function asynchrone for login the user
 *  and to set all his info.
 *
 * @function
 * @typedef {Object} user
 * @param {string} user.email - user's email
 * @param {string} user.password - user's password
 */
export const userLogin = (
    user: UserLogin,
): ThunkAction<void, rootState, unknown, Action<string>> => async (
    dispatch: Dispatch,
) => {
    try {
        dispatch(startLoadingUser());
        const response: AxiosResponse<ResponseAuth> = await api.post<ResponseAuth>(
            '/authenticate/sign-in',
            user,
        );

        const { user: userInfo, token } = response.data;

        api.setToken = token.token;

        dispatch(setToken(token.token));
        dispatch(setUserSuccess(userInfo));
        Authentication.logIn(() => dispatch(push('/dashboard')));

        dispatch(connectSocket());
        dispatch(joinChannel(uuidv4()));
        dispatch(stopLoadingUser());
    } catch (error) {
        Authentication.logOut(() => dispatch(push('/authenticate/sign-in')));
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError<INotify>;
            dispatch(setNotify(err.response?.data as INotify));
        }
        dispatch(stopLoadingUser());
    }
};

/**
 *  Function asynchrone for register the user
 *  and to set all his info.
 *
 * @function
 * @typedef {Object} user
 * @param {string} user.name - user-s name
 * @param {string} user.email - user's email
 * @param {string} user.password - user's password
 */
export const userRegister = (
    user: UserRegister,
): ThunkAction<void, rootState, unknown, Action<string>> => async (
    dispatch: Dispatch,
) => {
    try {
        dispatch(startLoadingUser());
        const response: AxiosResponse<ResponseAuth> = await api.post<ResponseAuth>(
            '/authenticate/sign-up',
            user,
        );

        const { user: userInfo, token } = response.data;

        api.setToken = token.token;

        dispatch(setToken(token.token));
        dispatch(setUserSuccess(userInfo));
        Authentication.logIn(() => dispatch(push('/dashboard')));

        dispatch(stopLoadingUser());
    } catch (error) {
        Authentication.logOut(() => dispatch(push('/authenticate/sign-in')));
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError<INotify>;
            dispatch(setNotify(err.response?.data as INotify));
        }
        dispatch(stopLoadingUser());
    }
};

/**
 *  Function asynchrone to verify the json web token.
 *  @function
 */
export const verifyToken = (): ThunkAction<
    void,
    rootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch, getState) => {
    try {
        dispatch(startLoadingUser());

        const {
            env: { token },
            user,
            router: {
                location: { pathname },
            },
        } = getState();

        if (token) {
            api.setToken = token;
        }

        const response: AxiosResponse<{ user: User }> = await api.post<{
            user: User;
        }>('/authenticate/verify', user);

        const { user: userInfo } = response.data;

        dispatch(setUserSuccess(userInfo));
        Authentication.logIn(() =>
            dispatch(
                push(
                    window.location.pathname !== pathname
                        ? window.location.pathname
                        : pathname,
                ),
            ),
        );

        dispatch(stopLoadingUser());
    } catch (error) {
        Authentication.logOut(() => dispatch(push('/authenticate/sign-in')));
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError<INotify>;
            dispatch(setNotify(err.response?.data as INotify));
        }
        dispatch(stopLoadingUser());
    }
};
