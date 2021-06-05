import { SET_TOKEN, SetTokenAction } from './types';

/**
 * @function
 * @param {string} token
 */
export const setToken = (token: string): SetTokenAction => ({
    type: SET_TOKEN,
    payload: token,
});
