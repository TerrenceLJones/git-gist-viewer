import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import _ from 'lodash';

import SearchForm from './SearchForm';

let SearchFormContainer = (props) => {
    return <SearchForm {...props} submitForm={props.submitForm} />;
}

const mapStateToProps = (state, ownProps) => {
    const queryString = _.get(ownProps, 'location.search');
    const searchValue = _.get(parse(queryString), 'q');

    return {
        initialValues: { searchValue }
    };
};

const mapDispatchToProps = null;

const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: 'headerSearchForm' }),
    withHandlers({
        submitForm: ({ handleSubmit, history }) => handleSubmit(({ searchValue }) => {
            history.push(`/search/?q=${searchValue}`);
        })
    })
);

export default enhance(SearchFormContainer);
