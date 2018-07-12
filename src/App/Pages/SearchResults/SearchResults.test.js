import React from 'react';
import { shallow } from 'enzyme';
import SearchResults from './SearchResults';

it('renders without crashing', () => {
    const results = [{ id: 1, id: 2 }];
    expect(shallow(<SearchResults results={results} />)).toMatchSnapshot();
});
