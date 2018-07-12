import React from 'react';
import { shallow } from 'enzyme';
import PageManger from './PageManger';

it('renders without crashing', () => {
    expect(shallow(<PageManger />)).toMatchSnapshot();
});
