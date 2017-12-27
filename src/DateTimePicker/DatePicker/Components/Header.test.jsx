import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Header from './Header';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent({ viewMonth, viewYear } = {}) {
  return mount(<Header viewMonth={viewMonth} viewYear={viewYear} />);
}

/*
 * handleClick(action)
 * action = one of [incMonth, decMonth]
  * */

describe('DatePicker Header Component', () => {
  it('mounts', () => {
    mountComponent({ viewMonth: 0 });
  });

  it('shows the correct view month', () => {
    const viewMonth = 0;
    const viewYear = 2017;
    const sut = mountComponent({ viewMonth, viewYear });
    const date = new Date(2017, viewMonth);
    const monthName = date.toLocaleString('en-us', { month: 'long' });

    expect(sut.text()).toMatch(monthName);
    expect(sut.text()).toMatch('2017');
  });

  it('calls handleClick correctly when clicking increment viewMonth button', () => {

  });

  it('calls handleClick correctly when clicking decrement viewMonth button', () => {

  });
});
