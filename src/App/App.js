import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux/configureStore';
import rootSaga from 'redux/sagas/rootSaga';

const store = configureStore();
store.runSaga(rootSaga);

const App = function App() {
    return (
        <Provider store={store}>
            <div>
                Git Gist Viewer main App
            </div>
        </Provider>
    );
}

export default App;
