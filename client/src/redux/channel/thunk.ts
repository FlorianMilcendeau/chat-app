import axios, { AxiosError, AxiosResponse } from 'axios';
import { push } from 'connected-react-router';

/** Types */
import type { Action, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { rootState } from '..';
import type { INotify } from '../notification/types';
import type { IChannel, TChannels } from './types';

/** Actions */
import {
    setAllChannels,
    setCurrentChannel,
    startLoadingChannel,
    stopLoadingChannel,
} from './actions';
import { setNotify } from '../notification/actions';

import api from '../../utils/http';
import Authentication from '../../Authentication/Authentication';

/**
 * Get channel by id
 * @function
 * @param id - channel's id
 */
export const getCurrentChannel = (
    id: string,
): ThunkAction<void, rootState, unknown, Action<string>> => async (
    dispatch: Dispatch,
    getState,
) => {
    const {
        env: { token },
    } = getState();

    api.setToken = token as string;
    try {
        dispatch(startLoadingChannel());
        const response: AxiosResponse<{ channel: IChannel }> = await api.get<{
            channel: IChannel;
        }>(`/channel/${id}`);

        dispatch(setCurrentChannel(response.data.channel));
        dispatch(stopLoadingChannel());
    } catch (error) {
        Authentication.logOut(() => dispatch(push('/authenticate/sign-in')));
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError<INotify>;
            dispatch(setNotify(err.response?.data as INotify));
        }
        dispatch(stopLoadingChannel());
    }
};

/**
 * Get all channels that user has subscribe
 * @function
 */
export const getAllChannels = (): ThunkAction<
    void,
    rootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch, getState) => {
    const {
        env: { token },
    } = getState();

    api.setToken = token as string;
    try {
        dispatch(startLoadingChannel());
        const response: AxiosResponse<TChannels[]> = await api.get<TChannels[]>(
            '/channel/',
        );

        dispatch(setAllChannels(response.data));
        dispatch(stopLoadingChannel());
    } catch (error) {
        Authentication.logOut(() => dispatch(push('/authenticate/sign-in')));
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError<INotify>;
            dispatch(setNotify(err.response?.data as INotify));
        }
        dispatch(stopLoadingChannel());
    }
};
