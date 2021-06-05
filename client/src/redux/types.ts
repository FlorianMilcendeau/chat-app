import { User } from './user/types';
import { Env } from './env/types';

export interface IMessage {
    id: number;
    content: string;
    user_id: number;
    channel_id: number;
    created_at: Date;
}

export interface State {
    env: Env;
    user: User;
}
