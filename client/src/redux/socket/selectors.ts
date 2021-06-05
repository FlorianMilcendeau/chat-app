import { Socket } from 'socket.io-client';
import { rootState } from '..';

/**
 *
 * @param {Object} state - Redux's state
 * @returns socket
 */
export const socketSelector = ({ socket }: rootState): Socket => socket;
