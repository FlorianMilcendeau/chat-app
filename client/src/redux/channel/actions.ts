import { IMessage } from '../types';
import {
    START_LOADING_CHANNEL,
    STOP_LOADING_CHANNEL,
    SET_CURRENT_CHANNEL,
    IStartLoadingChannel,
    IStopLoadingChannel,
    ISetCurrentChannel,
    IChannel,
    TChannels,
    ISetAllChannels,
    SET_ALL_CHANNEL,
    PUSH_MESSAGE,
    IPushMessage,
} from './types';

export const startLoadingChannel = (): IStartLoadingChannel => ({
    type: START_LOADING_CHANNEL,
});

export const stopLoadingChannel = (): IStopLoadingChannel => ({
    type: STOP_LOADING_CHANNEL,
});

export const setCurrentChannel = (channel: IChannel): ISetCurrentChannel => ({
    type: SET_CURRENT_CHANNEL,
    payload: { ...channel },
});

export const setAllChannels = (channels: TChannels[]): ISetAllChannels => ({
    type: SET_ALL_CHANNEL,
    payload: channels,
});

export const pushMessage = (message: IMessage): IPushMessage => ({
    type: PUSH_MESSAGE,
    payload: message,
});
