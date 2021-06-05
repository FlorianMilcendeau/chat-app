import type { Socket } from 'socket.io-client';
import type { IMessage } from '../types';
import {
    CONNECT,
    CONNECT_FAIL,
    CONNECT_SUCCESS,
    IConnectSocket,
    ISendMessage,
    IJoinChannel,
    ILeaveChannel,
    ISetTokenSocket,
    JOIN,
    JOIN_FAIL,
    JOIN_SUCCESS,
    LEAVE,
    LEAVE_FAIL,
    LEAVE_SUCCESS,
    SEND,
    SEND_FAIL,
    SEND_SUCCESS,
    SET_TOKEN_SOCKET,
    SOCKET,
    RECEIVE,
    IreceiveMessage,
    RECEIVE_SUCCESS,
    RECEIVE_FAIL,
} from './types';

export const setTokenSocket = (payload: string): ISetTokenSocket => ({
    type: SET_TOKEN_SOCKET,
    payload,
});

/**
 * Function to connect to socket
 */
export const connectSocket = (): IConnectSocket => ({
    type: SOCKET,
    types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAIL],
    promise: (socket: Socket) => socket.connect(),
});

/**
 * Function to join a channel
 * @param {string} channelId - channel's id
 */
export const joinChannel = (channelId: string): IJoinChannel => ({
    type: SOCKET,
    types: [JOIN, JOIN_SUCCESS, JOIN_FAIL],
    promise: (socket: Socket) => socket.emit('channel:join', channelId),
});

/**
 * Function to leave a channel
 * @param {string} channelId - channel's id
 */
export const leaveChannel = (channelId: string): ILeaveChannel => ({
    type: SOCKET,
    types: [LEAVE, LEAVE_SUCCESS, LEAVE_FAIL],
    promise: (socket: Socket) => socket.emit('channel:leave', channelId),
});

/**
 * Function to send a message
 * @typedef {Object} Message
 * @property {number} message.id - message's id
 * @property {string} message.content - message's content
 * @property {number} message.user_id - user's id
 * @property {number} message.channel_id - channel's id
 * @property {date} message.created_at - creation time
 */
export const sendMessage = (message: IMessage): ISendMessage => ({
    type: SOCKET,
    types: [SEND, SEND_SUCCESS, SEND_FAIL],
    promise: (socket: Socket) => socket.emit('message:send', message),
});

/**
 * Function to receive a message
 * @function
 * @callback cb
 * @param {...Message} message
 */
export const receiveMessage = (
    cb: (message: IMessage) => void,
): IreceiveMessage => ({
    type: SOCKET,
    types: [RECEIVE, RECEIVE_SUCCESS, RECEIVE_FAIL],
    promise: (socket: Socket) =>
        socket.on('message:send', (messageReceive: IMessage) => {
            cb(messageReceive);
        }),
});
