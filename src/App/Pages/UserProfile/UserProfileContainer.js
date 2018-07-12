import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { nonOptimalStates } from 'redux/utils/nonOptimalStates';
import { usersActions, usersTypes } from 'redux/modules/users';
import { apiSelectors } from 'redux/modules/api'
import UserProfile from './UserProfile';

const userLoadingSelector = apiSelectors.createLoadingSelector([usersTypes.API_HANDLER_LOAD_USER]);
const userErrorSelector = apiSelectors.createErrorMessageSelector([usersTypes.API_HANDLER_LOAD_USER]);


const LoadingDisplay = () => "Loading...";
const ErrorDisplay = ({ error }) => error;
const UserProfileContainer = ({ onClickBackToResults, user }) => {
    return <UserProfile user={user} onClickBackToResults={onClickBackToResults} />;
}

const mapStateToProps = (state, ownProps) => {
    const { match: { params: { userName } } } = ownProps;
    const user = state.users.selectedUser;

    return {
        isLoading: user ? userLoadingSelector(state) : true,
        loadError: userErrorSelector(state),
        user: user,
        userName
    }
};

const mapDispatchToProps = dispatch => ({
    loadUser: userName => dispatch(usersActions.loadUserRequest(userName))
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    lifecycle({
        componentDidMount() {
            const { userName } = this.props
            this.props.loadUser(userName);
        },
        componentDidUpdate(prevProps) {
            const prevUserName = _.get(prevProps, 'match.params.userName');
            const currUserName = _.get(this.props, 'match.params.userName');

            if (currUserName !== prevUserName) {
                this.props.loadUser(currUserName);
            }
        }
    }),
    withHandlers({
        onClickBackToResults: ({ history }) => () => {
            history.goBack();
        }
    }),
    nonOptimalStates([
        { when: ({ loadError }) => !!loadError, render: ErrorDisplay },
        { when: ({ isLoading }) => isLoading, render: LoadingDisplay }
    ])
);

export default enhance(UserProfileContainer);
