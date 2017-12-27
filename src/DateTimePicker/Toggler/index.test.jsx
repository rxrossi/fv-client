import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Toggler from './index';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent(date, show = 'clock', handleClick = () => {}) {
  return mount(<Toggler date={date} show={show} handleClick={handleClick} />);
}

describe('Toggle Component', () => {
  it('mounts', () => {
    const date = new Date(2017, 11, 30, 10, 20);
    mountComponent(date);
  });

  it('shows the clock', () => {
    const date = new Date(2017, 11, 30, 9, 1);
    const sut = mountComponent(date);
    expect(sut.text()).toMatch('09:01');
  });

  it('clicking the clock calls the handleClick', () => {
    const mockFn = jest.fn();
    const date = new Date(2017, 11, 30, 9, 1);
    const sut = mountComponent(date, 'clock', mockFn);
    sut.find('button').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('shows the time if the correct prop is passed', () => {
    const date = new Date(2017, 11, 30, 9, 1);
    const sut = mountComponent(date, 'date');
    expect(sut.text()).toMatch('2017 12 30');
  });

  it('clicking the date calls the handleClick', () => {
    const mockFn = jest.fn();
    const date = new Date(2017, 11, 30, 9, 1);
    const sut = mountComponent(date, 'date', mockFn);
    sut.find('button').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
