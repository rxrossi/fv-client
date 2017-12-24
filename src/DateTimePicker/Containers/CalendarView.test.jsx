import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import CalendarView from './CalendarView';
import Week from '../Components/Week';
import getWeeks from '../functions/getFullWeeksForAMonth';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('CalendarView Container', () => {
  it('renders', () => {
    mount(<CalendarView month={12} year={2017} />);
  });

  it('renders 6 Weeks for December 2017', () => {
    // Month is zero based, just because everything else seems to be
    const sut = mount(<CalendarView month={11} year={2017} />);
    const numberOfRenderedWeeks = sut.find(Week).length;
    expect(numberOfRenderedWeeks).toBe(6);
  });

  it('expects that the first Week Component gets the correct days', () => {
    const sut = mount(<CalendarView month={11} year={2017} />);
    const firstWeekComponent = sut.find(Week).at(0);
    expect(firstWeekComponent.props().week).toEqual(getWeeks(11, 2017)[0]);
  });

  it('expects that the last Week Component gets the correct days', () => {
    const sut = mount(<CalendarView month={11} year={2017} />);
    const firstWeekComponent = sut.find(Week).at(5);
    expect(firstWeekComponent.props().week).toEqual(getWeeks(11, 2017)[5]);
  });

  xit('calls the callback with correct date on Day click', () => {

  });
});
