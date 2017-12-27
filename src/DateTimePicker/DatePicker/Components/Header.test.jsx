import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Header from './Header';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent({ viewMonth, viewYear, handleClick = () => {} } = {
  handleClick: () => {},
}) {
  return mount(<Header
    viewMonth={viewMonth}
    viewYear={viewYear}
    handleClick={handleClick}
  />);
}

/*
 * handleClick(action)
 * action = one of [incMonth, decMonth]
  * */

describe('DatePicker Header Component', () => {
  it('mounts', () => {
    mountComponent({ viewMonth: 0, viewYear: 0 });
  });

  it('shows the correct view month', () => {
    const viewMonth = 0;
    const viewYear = 2017;
    const sut = mountComponent({ viewMonth, viewYear });
    const date = new Date(2017, viewMonth + 1);
    const monthName = date.toLocaleString('en-us', { month: 'long' });

    expect(sut.text()).toMatch(monthName);
    expect(sut.text()).toMatch('2017');
  });

  it('calls handleClick correctly when clicking increment viewMonth button', () => {
    const mockFn = jest.fn();
    const viewMonth = 0;
    const viewYear = 2017;
    const sut = mountComponent({ viewMonth, viewYear, handleClick: mockFn });
    // Act
    sut.find('button.inc-view-month').simulate('click');
    // Assert
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('incMonth');
  });

  it('calls handleClick correctly when clicking decrement viewMonth button', () => {
    const mockFn = jest.fn();
    const viewMonth = 0;
    const viewYear = 2017;
    const sut = mountComponent({ viewMonth, viewYear, handleClick: mockFn });
    // Act
    sut.find('button.dec-view-month').simulate('click');
    // Assert
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('decMonth');
  });
});
