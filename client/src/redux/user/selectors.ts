import { State } from '../types';
import { User } from './types';

/**
 *
 * @param {Object} state - Redux's state
 * @returns user
 */
export const userSelector = ({ user }: State): User => user;
