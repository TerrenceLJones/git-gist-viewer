import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import configureStore from 'redux/configureStore';
import rootSaga from 'redux/sagas/rootSaga';

import PageManager from './components/PageManager';


const store = configureStore();
store.runSaga(rootSaga);

const App = function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div>
                    <PageManager />
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
