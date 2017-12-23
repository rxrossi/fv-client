import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import MonthContainer from './Month';
import Week from '../Components/Week';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Month Container', () => {
  it('renders', () => {
    mount(<MonthContainer month={12} year={2017} />);
  });

  it.skip('renders 6 Weeks for December 2017', () => {
    const sut = mount(<MonthContainer month={12} year={2017} />);
    const numberOfRenderedWeeks = sut.find(Week).length;
    expect(numberOfRenderedWeeks).toBe(6);
  });
});
