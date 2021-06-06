import { User } from './user/types';
import { Env } from './env/types';

export interface IMember {
    id: number;
    role: string;
    user_id: number;
    channelId: number;
    createdAt: Date;
    user: Partial<User>;
}

export interface IMessage {
    id: number;
    content: string;
    user_id: number;
    channelId: number;
    createdAt: Date;
    user: Partial<User>;
}

export interface State {
    env: Env;
    user: User;
}
