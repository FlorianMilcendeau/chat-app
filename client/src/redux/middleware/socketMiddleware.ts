/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Socket } from 'socket.io-client';
import { Dispatch, AnyAction, MiddlewareAPI } from 'redux';
import { SOCKET } from '../socket/types';

const socketMiddleware = (socket: Socket) => {
    return ({ dispatch, getState }: MiddlewareAPI) => (
        next: Dispatch<AnyAction>,
    ): any => (action: any): any => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        const { promise, type, types, ...rest } = action;
        if (type !== SOCKET || !promise) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({ ...rest, type: REQUEST });

        return promise(socket)
            .then((result: any): void => {
                return next({ ...rest, result, type: SUCCESS });
            })
            .catch((error: any): void => {
                return next({ ...rest, error, type: FAILURE });
            });
    };
};

export default socketMiddleware;
