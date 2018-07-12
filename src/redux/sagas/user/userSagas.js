import { all, call, put, takeLatest } from 'redux-saga/effects'

import gitHubClient from 'lib/gitHubClient';
import { usersActions, usersTypes } from 'redux/modules/users';


function* watchLoadUserRequestSaga() {
    yield takeLatest(usersTypes.LOAD_USER_REQUEST, loadUser);
}

function* watchSearchUsersRequestSaga() {
    yield takeLatest(usersTypes.SEARCH_USERS_REQUEST, searchUsers);
}

function* loadUser({ payload: { userName } }) {
    try {
        const { user } = yield call(gitHubClient.getUser, userName);
        yield put(usersActions.loadUserSuccess(user));
    } catch (e) {
        yield put(usersActions.loadUserFailure(e));
    }
}

function* searchUsers({ payload: { queryString } }) {
    try {
        const { users } = yield call(gitHubClient.searchUsers, queryString);
        yield put(usersActions.searchUsersSuccess(users));
    } catch (e) {
        yield put(usersActions.searchUsersFailure(e));
    }
}

export {
    loadUser,
    searchUsers
}

export default function* rootSaga() {
    yield all([
        watchLoadUserRequestSaga(),
        watchSearchUsersRequestSaga()
    ])
};
