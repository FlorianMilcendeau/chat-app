import { INotify, SET_NOTIFY, TNotifyActions } from './types';

const initialState: INotify = {};

const notifyReducer = (
    state: INotify = initialState,
    action: TNotifyActions,
): INotify => {
    switch (action.type) {
        case SET_NOTIFY:
            return { ...state, ...action.payload };

        default:
            return { ...state };
    }
};

export default notifyReducer;
