import {
    IStartLoadingUser,
    IStopLoadingUser,
    SetUserAction,
    SET_USER,
    START_LOADING_USER,
    STOP_LOADING_USER,
    User,
} from './types';

export const startLoadingUser = (): IStartLoadingUser => ({
    type: START_LOADING_USER,
});

export const stopLoadingUser = (): IStopLoadingUser => ({
    type: STOP_LOADING_USER,
});

export const setUserSuccess = (user: User): SetUserAction => ({
    type: SET_USER,
    payload: user,
});
