import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string'
import _ from 'lodash';

import { nonOptimalStates } from 'redux/utils/nonOptimalStates';
import { apiSelectors } from 'redux/modules/api'
import { usersActions, usersTypes } from 'redux/modules/users';
import SearchResults from './SearchResults';

const resultsLoadingSelector = apiSelectors.createLoadingSelector([usersTypes.API_HANDLER_SEARCH_USERS]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([usersTypes.API_HANDLER_SEARCH_USERS]);

const LoadingDisplay = () => "Loading...";
const ErrorDisplay = ({ error }) => error;
const NoResultsDisplay = () => <span>No Results. Please try your search again.</span>;
const SearchResultsContainer = ({ handleSearchItemClick, results }) => {
    return <SearchResults results={results} handleSearchItemClick={handleSearchItemClick} />
};

const mapStateToProps = (state, ownProps) => {
    const queryString = _.get(ownProps, 'location.search');
    const searchValue = _.get(parse(queryString), 'q')
    const results = state.users.searchResults;

    return {
        isLoading: results.length ? resultsLoadingSelector(state) : true,
        loadError: resultsErrorSelector(state),
        results,
        searchValue
    }
};

const mapDispatchToProps = dispatch => ({
    searchUsers: queryString => dispatch(usersActions.searchUsersRequest(queryString))
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    lifecycle({
        componentDidMount() {
            this.props.searchUsers(this.props.searchValue);
        },
        componentDidUpdate(prevProps) {
            const prevSerchValue = prevProps.searchValue;
            const currSearchValue = this.props.searchValue;

            if (currSearchValue !== prevSerchValue) {
                this.props.searchUsers(currSearchValue);
            }
        }
    }),
    withHandlers({
        handleSearchItemClick: ({ history }) => ({ target }) => {
            const userName = target.parentElement.id;
            history.push(`/users/${userName}`);
        }
    }),
    nonOptimalStates([
        { when: ({ loadError }) => !!loadError, render: ErrorDisplay },
        { when: ({ results }) => _.isEmpty(results), render: NoResultsDisplay },
        { when: ({ isLoading }) => isLoading, render: LoadingDisplay }
    ])
);

export default enhance(SearchResultsContainer);
