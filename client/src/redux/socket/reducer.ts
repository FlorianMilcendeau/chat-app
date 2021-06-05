import { CONNECT, JOIN, LEAVE, TSocketAction } from './types';

const socketReducer = (state = {}, action: TSocketAction): unknown => {
    switch (action.type) {
        case JOIN:
            return { ...state };
        case LEAVE:
            return { ...state };
        case CONNECT:
            return { ...state };
        default:
            return { ...state };
    }
};

export default socketReducer;
