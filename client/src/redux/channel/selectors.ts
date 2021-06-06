import type { rootState } from '..';
import { IMember, IMessage } from '../types';
import { IChannel, TChannels } from './types';

/**
 *
 * @param {Object} state - Redux's state
 * @returns channel's messages
 */
export const messagesSelector = (state: rootState): IMessage[] =>
    state.channels.current.messages;

/**
 *
 * @param {Object} state - Redux's state
 * @returns channel's members
 */
export const membersSelector = (state: rootState): IMember[] =>
    state.channels.current.members;

/**
 *
 * @param {Object} state - Redux's state
 * @returns All channels
 */
export const channelsSelector = (state: rootState): TChannels[] =>
    state.channels.channels;

/**
 *
 * @param {Object} state - Redux's state
 * @returns current channels
 */
export const currentChannelsSelector = (state: rootState): IChannel =>
    state.channels.current;
