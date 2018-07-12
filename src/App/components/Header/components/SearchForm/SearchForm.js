import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const SearchForm = ({ pristine, submitForm, submitting }) => {
    return (
        <form onSubmit={submitForm}>
            <Field
                component='input'
                name='searchValue'
                placeholder='Search&hellip;'
                type='text'
            />
            <button type='submit' disabled={pristine || submitting}>Search</button>
        </form>
    );
};

export default SearchForm;