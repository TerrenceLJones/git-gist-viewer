import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import configureStore from 'redux/configureStore';
import rootSaga from 'redux/sagas/rootSaga';

import Header from './components/Header';
import PageManager from './components/PageManger';


const store = configureStore();
store.runSaga(rootSaga);

const App = function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div>
                    <Header />
                    <PageManager />
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
