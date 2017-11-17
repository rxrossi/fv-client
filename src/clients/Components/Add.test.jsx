import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Add Client', () => {
  it('renders', () => {
    const submitFn = jest.fn();
    const sut = shallow(<Add const handleSubmit={submitFn} />);

    sut.find('form').simulate('submit');

    expect(submitFn.mock.calls.length).toBe(1);
  });
});
