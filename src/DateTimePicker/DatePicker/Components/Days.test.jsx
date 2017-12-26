import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Days from './Days';
import Day from './Day';
import getDays from '../../helpers/getDays/';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent(days = [], handleClick = () => {}, selectedDay) {
  return mount(<Days days={days} handleClick={handleClick} selectedDay={selectedDay} />);
}

describe('Days Component', () => {
  it('mounts', () => {
    mountComponent();
  });

  it('shows the correct amount of Day components for December 2017', () => {
    const days = getDays(11, 2017);
    const sut = mountComponent(days);
    const DayComponents = sut.find(Day);
    expect(DayComponents.length).toBe(days.length);
  });

  it('shows the correct amount of Day components for December 2017', () => {
    const days = getDays(11, 2017);
    const sut = mountComponent(days);
    const DayComponents = sut.find(Day);
    expect(DayComponents.length).toBe(days.length);
  });

  it('calls the handleClick with the correct day', () => {
    const days = getDays(11, 2017);
    const mockFn = jest.fn();
    const sut = mountComponent(days, mockFn);
    const DayComponents = sut.find(Day);
    const day3Btn = DayComponents.at(7);
    const day3Date = day3Btn.props().date;

    // Act
    day3Btn.simulate('click');

    // Assert
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(day3Date);
  });

  it('add selected true to the right day', () => {
    const days = getDays(11, 2017);
    const selectedDay = days[7];
    const mockFn = jest.fn();
    const sut = mountComponent(days, mockFn, selectedDay);
    const DayComponents = sut.find(Day);

    const day3Btn = DayComponents.at(7).find('button');
    const day3SelectedProp = day3Btn.props().selected;

    // Assert
    expect(day3SelectedProp).toBe(true);
  });
});
