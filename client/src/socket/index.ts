/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

const host = 'http://localhost';
const socketPath = '/socket/';

export default class SocketAPI {
    protected socket:
        | Socket<DefaultEventsMap, DefaultEventsMap>
        | null
        | undefined;

    public connect(): Promise<void> {
        this.socket = io(host, { path: socketPath });

        return new Promise<void>((resolve, reject) => {
            (this.socket as Socket<
                DefaultEventsMap,
                DefaultEventsMap
            >).on('connect', () => resolve());
            (this.socket as Socket<
                DefaultEventsMap,
                DefaultEventsMap
            >).on('connect_error', (error) => reject(error));
        });
    }

    public disconnect(): Promise<void> {
        return new Promise<void>((resolve) => {
            (this.socket as Socket<DefaultEventsMap, DefaultEventsMap>).on(
                'disconnect',
                (): void => {
                    this.socket = null;
                    resolve();
                },
            );
        });
    }

    public emit(event: string, data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.socket) {
                return reject(new Error('No socket connection.'));
            }

            return this.socket.emit(event, data, (response: any) => {
                if (response.error) {
                    reject(new Error(response.error));
                } else {
                    resolve();
                }
            });
        });
    }

    public on(event: string, cb: () => void): Promise<void> {
        // No promise is needed here, but we're expecting one in the middleware.
        return new Promise<void>((resolve, reject) => {
            if (!this.socket) {
                reject(new Error('No socket connection.'));
            } else {
                this.socket.on(event, cb);
                resolve();
            }
        });
    }
}
