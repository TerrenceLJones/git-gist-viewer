import { combineReducers } from 'redux';
import apiReducer from './api';
import usersReducer from './users';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    api: apiReducer,
    form: formReducer,
    users: usersReducer
});
