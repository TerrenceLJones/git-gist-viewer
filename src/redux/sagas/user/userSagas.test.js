import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import gitHubClient from 'lib/gitHubClient';
import { usersActions } from 'redux/modules/users';
import { loadUser, searchUsers } from './userSagas';

const fakeUserName = 'fakeUser1';
const fakeQueryString = 'abcde';
const mockGetUser = jest.spyOn(gitHubClient, 'getUser');
const mockSearchUsers = jest.spyOn(gitHubClient, 'searchUsers');


describe('userSagas', () => {
    describe('loadUser', () => {
        beforeEach(() => {
            mockGetUser.mockReset();
        });

        describe('when api call is successful', () => {
            it('calls loadUserSuccess event creator', () => {
                const user = {
                    name: 'Fake User',
                    id: 1
                };

                return expectSaga(loadUser, { payload: { userName: fakeUserName } })
                    .provide([[matchers.call.fn(mockGetUser), { user: user }]])
                    .put(usersActions.loadUserSuccess(user))
                    .run()
            });
        });

        describe('when api call is not successful', () => {
            it('calls loadUserFailure event creator', () => {
                const error = new Error('Response Error');

                return expectSaga(loadUser, { payload: { userName: fakeUserName } })
                    .provide([[matchers.call.fn(mockGetUser), throwError(error)]])
                    .put(usersActions.loadUserFailure(error))
                    .run()
            });
        });
    });

    describe('searchUsers', () => {
        beforeEach(() => {
            mockSearchUsers.mockReset();
        });

        describe('when api call is successful', () => {
            const usersData = [{ id: 1 }, { id: 2 }];
            it('calls searchUsersSuccess event creator', () => {
                return expectSaga(searchUsers, { payload: { queryString: fakeQueryString } })
                    .provide([[matchers.call.fn(mockSearchUsers), { users: usersData }]])
                    .put(usersActions.searchUsersSuccess(usersData))
                    .run()
            });
        });

        describe('when api call is not successful', () => {
            it('calls searchUserFailure event creator', () => {
                const error = new Error('Response Error');

                return expectSaga(searchUsers, { payload: { queryString: fakeQueryString } })
                    .provide([[matchers.call.fn(mockSearchUsers), throwError(error)]])
                    .put(usersActions.searchUsersFailure(error))
                    .run()
            });
        });
    });
});
