import type { Socket } from 'socket.io-client';

export const SOCKET = 'SOCKET';
export const SET_TOKEN_SOCKET = 'SET_TOKEN_SOCKET';

export const JOIN = 'JOIN';
export const JOIN_SUCCESS = 'JOIN_SUCCESS';
export const JOIN_FAIL = 'JOIN_FAIL';

export const LEAVE = 'LEAVE';
export const LEAVE_SUCCESS = 'LEAVE_SUCCESS';
export const LEAVE_FAIL = 'LEAVE_FAIL';

export const CONNECT = 'CONNECT';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAIL = 'CONNECT_FAIL';

export const SEND = 'SEND';
export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_FAIL = 'SEND_FAIL';

export const RECEIVE = 'RECEIVE';
export const RECEIVE_SUCCESS = 'RECEIVE_SUCCESS';
export const RECEIVE_FAIL = 'RECEIVE_FAIL';

export interface ISetTokenSocket {
    type: typeof SET_TOKEN_SOCKET;
    payload: string;
}

export interface IJoinChannel {
    type: typeof SOCKET;
    types: [typeof JOIN, typeof JOIN_SUCCESS, typeof JOIN_FAIL];
    promise: (socket: Socket) => void;
}

export interface ILeaveChannel {
    type: typeof SOCKET;
    types: [typeof LEAVE, typeof LEAVE_SUCCESS, typeof LEAVE_FAIL];
    promise: (socket: Socket) => void;
}

export interface IConnectSocket {
    type: typeof SOCKET;
    types: [typeof CONNECT, typeof CONNECT_SUCCESS, typeof CONNECT_FAIL];
    promise: (socket: Socket) => void;
}

export interface ISendMessage {
    type: typeof SOCKET;
    types: [typeof SEND, typeof SEND_SUCCESS, typeof SEND_FAIL];
    promise: (socket: Socket) => void;
}

export interface IreceiveMessage {
    type: typeof SOCKET;
    types: [typeof RECEIVE, typeof RECEIVE_SUCCESS, typeof RECEIVE_FAIL];
    promise: (socket: Socket) => void;
}

export interface IJoin {
    type: typeof JOIN;
}

export interface ILeave {
    type: typeof LEAVE;
}

export interface IConnect {
    type: typeof CONNECT;
}

export type TSocketAction = IConnect | IJoin | ILeave;
