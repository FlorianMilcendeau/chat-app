import axios, { AxiosInstance, AxiosResponse } from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

const URL: string = REACT_APP_SERVER_URL || '';

/**
 * @class
 */
class Api {
    private instance: AxiosInstance;

    private token: string;

    /**
     * @constructor
     * @param {string} serverUrl - server's url
     */
    constructor(serverUrl: string) {
        this.instance = axios.create({
            baseURL: serverUrl,
            headers: { 'Content-type': 'application/json' },
        });
        this.token = '';
    }

    /**
     * @setter
     * @param token
     */
    public set setToken(token: string) {
        this.token = token;
    }

    /**
     * @method
     * @param {string} path
     */
    public async get(path: string) {
        const response = await this.instance.get(path, {
            headers: { Authorization: this.token },
        });

        return response;
    }

    /**
     * @method
     * @param path
     * @param data
     */
    public async post<T>(
        path: string,
        data: unknown,
    ): Promise<AxiosResponse<T>> {
        const response = await this.instance.post(path, data, {
            headers: { Authorization: this.token },
        });

        return response as AxiosResponse<T>;
    }

    /**
     * @method
     * @param {string} path
     * @param {unknown} data
     */
    public async put(path: string, data: unknown) {
        const response = await this.instance.put(path, data, {
            headers: { Authorization: this.token },
        });

        return response;
    }

    /**
     * @method
     * @param {string} path
     */
    public async delete(path: string) {
        const response = await this.instance.delete(path, {
            headers: { Authorization: this.token },
        });

        return response;
    }
}

export default new Api(URL);
