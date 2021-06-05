import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { Socket } from 'socket.io-client';

/** Reducers */
import userReducer from './user/reducer';
import envReducer from './env/reducer';
import notifyReducer from './notification/reducer';
import socketReducer from './socket/reducer';
import socketMiddleware from './middleware/socketMiddleware';
import SocketAPI from '../socket';

const NODE_ENV = process.env.NODE_ENV || 'development';
const socket = (new SocketAPI() as unknown) as Socket;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    notification: notifyReducer,
    env: envReducer,
    user: userReducer,
    socket: socketReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'env', 'router'],
};

const enhancer =
    NODE_ENV === 'development'
        ? composeWithDevTools(
              applyMiddleware(...[thunk, socketMiddleware(socket)]),
              applyMiddleware(routerMiddleware(history)),
          )
        : applyMiddleware(...[thunk, socketMiddleware(socket)]);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

export type rootState = ReturnType<typeof rootReducer>;
