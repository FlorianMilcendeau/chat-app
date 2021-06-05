import { Token } from '../env/types';

export const START_LOADING_USER = 'START_LOADING_USER';
export const STOP_LOADING_USER = 'STOP_LOADING_USER';
export const SET_USER = 'SET_USER';

export interface User {
    loading: boolean;
    id: number | null;
    name: string;
    email: string;
    createdAt: Date | null;
}

export interface IStartLoadingUser {
    type: typeof START_LOADING_USER;
}

export interface IStopLoadingUser {
    type: typeof STOP_LOADING_USER;
}

export interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

export type UserLogin = {
    email: string;
    password: string;
};

export interface UserRegister extends UserLogin {
    name: string;
}

export interface ResponseAuth {
    success: boolean;
    user: User;
    token: Token;
}

export type TUserActions = IStartLoadingUser | SetUserAction | IStopLoadingUser;
