import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Form from './Form';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Professionals Form Form', () => {
  it('renders', () => {
    mount(<Form handleSubmit={() => {}} handleChange={() => {}} values={{}} errors={{}} />);
  });
});
