import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Professionals Add Form', () => {
  it('renders', () => {
    mount(<Add handleSubmit={() => {}} handleChange={() => {}} values={{}} errors={{}} />);
  });
});
