import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import Root from './components/routes/Root';
import { history, persistor, store } from './redux/index';
import Loader from './components/common/Loader/Loader';

function App(): ReactElement {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<Loader size="l" color="primary" />}
                persistor={persistor}
            >
                <ConnectedRouter history={history}>
                    <Root />
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
