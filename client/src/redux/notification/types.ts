export const SET_NOTIFY = 'SET_NOTIFY';

export interface INotify {
    message?: string;
    success?: boolean;
}

export interface ISetNotify {
    type: typeof SET_NOTIFY;
    payload: INotify;
}

export type TNotifyActions = ISetNotify;
