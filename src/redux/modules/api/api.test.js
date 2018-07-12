import moment from 'moment';
import { loadingDataReducer, errorsReducer, lastFetchReducer } from './api';

const initialState = {};

const requestAction = { type: 'LOAD_RESOURCE_REQUEST' };
const successAction = { type: 'LOAD_RESOURCE_SUCCESS' };
const failureAction = {
    type: 'LOAD_RESOURCE_FAILURE',
    payload: {
        message: 'Some error'
    }
};

describe('loadingDataReducer', () => {
    it('should handle LOAD_RESOURCE_REQUEST', () => {
        const expected = { "LOAD_RESOURCE": true };
        expect(loadingDataReducer(initialState, requestAction)).toEqual(expected)
    });

    it('should handle LOAD_RESOURCE_SUCCESS', () => {
        const currentState = { "LOAD_RESOURCE": true };
        const expected = { "LOAD_RESOURCE": false };
        expect(loadingDataReducer(currentState, successAction)).toEqual(expected);
    });

    it('should handle LOAD_RESOURCE_FAILURE', () => {
        const currentState = { "LOAD_RESOURCE": true };
        const expected = { "LOAD_RESOURCE": false };
        expect(loadingDataReducer(currentState, failureAction)).toEqual(expected)
    });
});

describe('errorsReducer', () => {
    it('should handle LOAD_RESOURCE_REQUEST', () => {
        const expected = { "LOAD_RESOURCE": '' };
        expect(errorsReducer(initialState, requestAction)).toEqual(expected)
    });

    it('should handle LOAD_RESOURCE_SUCCESS', () => {
        expect(errorsReducer(initialState, successAction)).toEqual(initialState);
    });

    it('should handle LOAD_RESOURCE_FAILURE', () => {
        const currentState = { "LOAD_RESOURCE": '' };
        const expected = { "LOAD_RESOURCE": 'Some error' };
        expect(errorsReducer(currentState, failureAction)).toEqual(expected)
    });
});

describe('lastFetchReducer', () => {
    it('should handle LOAD_RESOURCE_REQUEST', () => {
        const expected = { "LOAD_RESOURCE": '' };
        expect(lastFetchReducer(initialState, requestAction)).toEqual(expected)
    });

    it('should handle LOAD_RESOURCE_SUCCESS', () => {
        const currentState = { "LOAD_RESOURCE": '' };
        const expected = { LOAD_RESOURCE: moment().format() }

        expect(lastFetchReducer(currentState, successAction)).toEqual(expected);
    });

    it('should handle LOAD_RESOURCE_FAILURE', () => {
        const currentState = { "LOAD_RESOURCE": '' };
        const expected = { LOAD_RESOURCE: '' };
        expect(lastFetchReducer(currentState, failureAction)).toEqual(expected)
    });
});
