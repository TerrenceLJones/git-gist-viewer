import reducer, { actions, types } from './users';

const initialState = {
    selectedUser: '',
    searchResults: []
};
const queryString = "abcdef";
const userName = 'rj123';
const user = { id: 1, userName };

describe('actions', () => {
    it('creates an action for a request to load gists', () => {
        const actual = actions.loadUserRequest(userName);
        const expected = {
            type: types.LOAD_USER_REQUEST,
            payload: {
                userName
            }
        };

        expect(actual).toEqual(expected);
    });

    it('creates an action for a successful load gists response', () => {
        const actual = actions.loadUserSuccess(user);
        const expected = {
            type: types.LOAD_USER_SUCCESS,
            payload: {
                user
            }
        };

        expect(actual).toEqual(expected);
    });

    it('creates an action for a failing load gists response', () => {
        const error = 'Load Error';
        const actual = actions.loadUserFailure(error);
        const expected = {
            type: types.LOAD_USER_FAILURE,
            payload: {
                error
            }
        };

        expect(actual).toEqual(expected);
    });

    it('creates an action for a request to load users', () => {
        const actual = actions.searchUsersRequest(queryString);
        const expected = {
            type: types.SEARCH_USERS_REQUEST,
            payload: {
                queryString
            }
        };

        expect(actual).toEqual(expected);
    });

    it('creates an action for a successful load users response', () => {
        const searchResults = [{ id: 1, id: 2, id: 3 }];
        const actual = actions.searchUsersSuccess(searchResults);
        const expected = {
            type: types.SEARCH_USERS_SUCCESS,
            payload: {
                searchResults
            }
        };

        expect(actual).toEqual(expected);
    });

    it('creates an action for a failing load users response', () => {
        const error = 'Load Error';
        const actual = actions.searchUsersFailure(error);
        const expected = {
            type: types.SEARCH_USERS_FAILURE,
            payload: {
                error
            }
        };

        expect(actual).toEqual(expected);
    });
});

describe('reducer', () => {
    it('handles LOAD_USER_REQUEST action', () => {
        const action = {
            type: types.LOAD_USER_REQUEST,
            payload: {
                userName
            }
        };

        expect(reducer(initialState, action)).toEqual(initialState)
    });

    it('handles LOAD_USER_SUCCESS action', () => {
        const action = {
            type: types.LOAD_USER_SUCCESS,
            payload: {
                user
            }
        };

        const expected = { ...initialState, selectedUser: user };

        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('handles LOAD_USER_FAILURE action', () => {
        const currentState = { ...initialState, selectedUser: user };
        const action = {
            type: types.LOAD_USER_FAILURE,
            err: 'Some error'
        };

        expect(reducer(currentState, action)).toEqual(initialState)
    });

    it('handles SEARCH_USERS_REQUEST action', () => {
        const action = {
            type: types.SEARCH_USERS_REQUEST,
            payload: {
                queryString
            }
        };

        expect(reducer(initialState, action)).toEqual(initialState)
    });

    it('handles SEARCH_USERS_SUCCESS action', () => {
        const searchResults = [{ id: 1, id: 2, id: 3 }];
        const action = {
            type: types.SEARCH_USERS_SUCCESS,
            payload: {
                searchResults
            }
        };

        const expected = { ...initialState, searchResults }

        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('handles SEARCH_USERS_FAILURE action', () => {
        const searchResults = [{ id: 1, id: 2, id: 3 }];
        const currentState = { ...initialState, searchResults }

        const action = {
            type: types.SEARCH_USERS_FAILURE,
            err: 'Some error'
        };

        expect(reducer(currentState, action)).toEqual(initialState)
    });

    it('handles unknown actions', () => {
        const currentState = {
            user
        };
        expect(reducer(currentState, { type: 'UNKNOWN' })).toEqual(currentState)
    });
});
