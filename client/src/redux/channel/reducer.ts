import {
    START_LOADING_CHANNEL,
    STOP_LOADING_CHANNEL,
    SET_CURRENT_CHANNEL,
    TChannelActions,
    IChannels,
    SET_ALL_CHANNEL,
    PUSH_MESSAGE,
} from './types';

const channel: IChannels = {
    loading: false,
    current: {
        id: null,
        name: '',
        describe: '',
        members: [],
        messages: [],
        createdAt: null,
    },
    channels: [],
};

const channelReducer = (
    state: IChannels = channel,
    action: TChannelActions,
): IChannels => {
    switch (action.type) {
        case START_LOADING_CHANNEL:
            return { ...state, loading: true };
        case STOP_LOADING_CHANNEL:
            return { ...state, loading: false };
        case SET_CURRENT_CHANNEL:
            return { ...state, current: { ...action.payload } };
        case PUSH_MESSAGE:
            return {
                ...state,
                current: {
                    ...state.current,
                    messages: [
                        ...state.current.messages,
                        { ...action.payload },
                    ],
                },
            };
        case SET_ALL_CHANNEL:
            return { ...state, channels: [...action.payload] };
        default:
            return state;
    }
};

export default channelReducer;
