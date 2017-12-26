import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import ClockView from './ClockView';
// Configure Enzyme
configure({ adapter: new Adapter() });

/*
  handleClick([h, m], [more, plus, minus])
*/


const mountComponent = (time, handleClick = () => {}) =>
  mount(<ClockView
    time={time}
    handleClick={handleClick}
  />);

describe('ClockView', () => {
  const hours = '15';
  const minutes = '50';
  const time = '15:50';

  it('mounts', () => {
    mountComponent(time);
  });

  it('shows the hours', () => {
    const sut = mountComponent(time);
    expect(sut.text()).toMatch(hours);
  });

  it('shows the minutes', () => {
    const sut = mountComponent(time);
    expect(sut.text()).toMatch(minutes);
  });

  it('calls handleClick correctly when clicking the hours', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(time, mockFn);
    sut.find('button.hours-btn').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('h', 'more');
  });

  it('calls handleClick correctly on minutes button click', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(time, mockFn);
    sut.find('button.minutes-btn').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('m', 'more');
  });

  it('calls handleClick correctly on increase hour button', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(time, mockFn);
    sut.find('button.hours-plus-btn').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('h', 'plus');
  });

  it('calls handleClick correctly on decrease hour button', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(time, mockFn);
    sut.find('button.hours-minus-btn').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('h', 'minus');
  });

  it('calls handleClick correctly on increase minutes button', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(time, mockFn);
    sut.find('button.minutes-plus-btn').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('m', 'plus');
  });

  it('calls handleClick correctly on decrease minutes button', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(time, mockFn);
    sut.find('button.minutes-minus-btn').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('m', 'minus');
  });
});
