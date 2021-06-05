import {
    SET_USER,
    START_LOADING_USER,
    STOP_LOADING_USER,
    TUserActions,
    User,
} from './types';

const user: User = {
    loading: false,
    id: null,
    name: '',
    email: '',
    createdAt: null,
};

const userReducer = (state: User = user, action: TUserActions): User => {
    switch (action.type) {
        case START_LOADING_USER:
            return { ...state, loading: true };
        case STOP_LOADING_USER:
            return { ...state, loading: false };
        case SET_USER:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};

export default userReducer;
