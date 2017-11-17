import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Clients from './index';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Clients index', () => {
  it('renders', () => {
    shallow(<Clients />);
  });
});
