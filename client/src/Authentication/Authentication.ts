import type { rootState } from '../redux';
import type { Env } from '../redux/env/types';

/**
 * @class Authentication
 */
class Authentication {
    private authenticate: boolean;

    private token: string | null;

    constructor() {
        this.authenticate = !!this.getToken;

        const data = localStorage.getItem('persist:root');

        if (typeof data === 'string') {
            const { env } = JSON.parse(data) as rootState;
            const { token } = JSON.parse((env as unknown) as string) as Env;

            this.token = token;
        } else {
            this.token = null;
        }
    }

    private get getToken(): string | null {
        return this.token;
    }

    public logIn(cb: () => void) {
        this.authenticate = true;
        cb();
    }

    public logOut(cb: () => void) {
        this.authenticate = false;
        cb();
    }

    public get isAuthenticate() {
        return this.authenticate;
    }
}

export default new Authentication();
