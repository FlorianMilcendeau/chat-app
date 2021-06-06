import type { IMember, IMessage } from '../types';

export const START_LOADING_CHANNEL = 'START_LOADING_CHANNEL';
export const STOP_LOADING_CHANNEL = 'STOP_LOADING_CHANNEL';
export const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
export const SET_ALL_CHANNEL = 'SET_ALL_CHANNEL';
export const PUSH_MESSAGE = 'PUSH_MESSAGE';

export interface IChannel {
    id: number | null;
    name: string;
    describe: string;
    createdAt: Date | null;
    members: IMember[];
    messages: IMessage[];
}

export type TChannels = {
    id: number;
    name: string;
    describe: string;
    createdAt: string;
};

export interface IChannels {
    loading: boolean;
    current: IChannel;
    channels: TChannels[];
}

export interface IStartLoadingChannel {
    type: typeof START_LOADING_CHANNEL;
}

export interface IStopLoadingChannel {
    type: typeof STOP_LOADING_CHANNEL;
}

export interface ISetCurrentChannel {
    type: typeof SET_CURRENT_CHANNEL;
    payload: IChannel;
}

export interface ISetAllChannels {
    type: typeof SET_ALL_CHANNEL;
    payload: TChannels[];
}

export interface IPushMessage {
    type: typeof PUSH_MESSAGE;
    payload: IMessage;
}

export type TChannelActions =
    | IStartLoadingChannel
    | IStopLoadingChannel
    | ISetCurrentChannel
    | ISetAllChannels
    | IPushMessage;
