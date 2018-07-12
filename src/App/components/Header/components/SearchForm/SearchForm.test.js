import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from './SearchForm';

it('renders without crashing', () => {
    expect(shallow(<SearchForm />)).toMatchSnapshot();
});
