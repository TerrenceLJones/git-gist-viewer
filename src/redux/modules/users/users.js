const types = {
    LOAD_USER_REQUEST: 'git-gists/user/LOAD_USER_REQUEST',
    LOAD_USER_FAILURE: 'git-gists/user/LOAD_USER_FAILURE',
    LOAD_USER_SUCCESS: 'git-gists/user/LOAD_USER_SUCCESS',
    SEARCH_USERS_REQUEST: 'git-gists/user/SEARCH_USERS_REQUEST',
    SEARCH_USERS_FAILURE: 'git-gists/user/SEARCH_USERS_FAILURE',
    SEARCH_USERS_SUCCESS: 'git-gists/user/SEARCH_USERS_SUCCESS',
    API_HANDLER_LOAD_USER: 'git-gists/user/LOAD_USER',
    API_HANDLER_SEARCH_USERS: 'git-gists/user/SEARCH_USERS'
};

const initialState = {
    selectedUser: '',
    searchResults: []
};

const reducer = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case types.LOAD_USER_FAILURE:
            return initialState;
        case types.LOAD_USER_SUCCESS:
            return { ...state, selectedUser: payload.user };
        case types.SEARCH_USERS_SUCCESS:
            return { ...state, searchResults: payload.searchResults };
        case types.SEARCH_USERS_FAILURE:
            return { ...state, searchResults: [] };
        default:
            return state;
    }
}

const actions = {
    loadUserRequest: (userName) => ({
        type: types.LOAD_USER_REQUEST,
        payload: {
            userName
        }
    }),
    loadUserFailure: (error) => ({
        type: types.LOAD_USER_FAILURE,
        payload: {
            error
        }
    }),
    loadUserSuccess: (user) => ({
        type: types.LOAD_USER_SUCCESS,
        payload: {
            user
        }
    }),
    searchUsersRequest: (queryString) => ({
        type: types.SEARCH_USERS_REQUEST,
        payload: {
            queryString
        }
    }),
    searchUsersFailure: (error) => ({
        type: types.SEARCH_USERS_FAILURE,
        payload: {
            error
        }
    }),
    searchUsersSuccess: (searchResults) => ({
        type: types.SEARCH_USERS_SUCCESS,
        payload: {
            searchResults
        }
    }),
};


export {
    actions,
    types
};

export default reducer;
