import { combineReducers } from 'redux';
import _ from 'lodash';
import moment from 'moment';

const loadingDataReducer = (state = {}, { type } = {}) => {
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if (!matches) return state;

    const [, requestName, requestState] = matches;

    return {
        ...state,
        [requestName]: _.isEqual(requestState, 'REQUEST')
    };
};

const errorsReducer = (state = {}, { type, payload } = {}) => {
    const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

    if (!matches) return state;

    const [, requestName, requestState] = matches;
    const errorMessage = _.get(payload, 'message');

    return {
        ...state,
        [requestName]: _.isEqual(requestState, 'FAILURE') ? errorMessage : '',
    };
};

const lastFetchReducer = (state = {}, { type, payload } = {}) => {
    const matches = /(.*)_(REQUEST|SUCCESS)/.exec(type);

    if (!matches) return state;

    const [, requestName, requestState] = matches;

    return {
        ...state,
        [requestName]: _.isEqual(requestState, 'SUCCESS') ? moment().format() : '',
    };
};

const selectors = {
    createLoadingSelector(actions) {
        return (state) => {
            return _(actions)
                .some((action) => _.get(state, `api.loading.${action}`));
        }
    },
    createErrorMessageSelector(actions) {
        return (state) => {
            return _(actions)
                .map((action) => _.get(state, `api.errors.${action}`))
                .compact()
                .first() || '';
        };
    }
};

export {
    loadingDataReducer,
    errorsReducer,
    lastFetchReducer,
    selectors
};

export default combineReducers({
    errors: errorsReducer,
    loading: loadingDataReducer,
    lastFetch: lastFetchReducer
});
