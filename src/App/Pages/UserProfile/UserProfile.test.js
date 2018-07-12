import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from './UserProfile';

it('renders without crashing', () => {
    expect(shallow(<UserProfile user={{}} />)).toMatchSnapshot();
});
