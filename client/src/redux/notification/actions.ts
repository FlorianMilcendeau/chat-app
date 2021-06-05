import { INotify, ISetNotify, SET_NOTIFY } from './types';

/**
 * @function
 * @typedef {Object} notification
 * @param {string} message
 * @param {boolean} success
 */
export const setNotify = (notification: INotify): ISetNotify => ({
    type: SET_NOTIFY,
    payload: notification,
});
