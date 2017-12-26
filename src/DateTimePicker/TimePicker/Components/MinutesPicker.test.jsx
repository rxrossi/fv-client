import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import MinutesPicker from './MinutesPicker';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent(handleClick = () => {}) {
  return mount(<MinutesPicker handleClick={handleClick} />);
}

describe('MinutesPicker', () => {
  it('mounts', () => {
    mountComponent();
  });

  it('renders 12 buttons', () => {
    const sut = mountComponent(() => {});
    const buttons = sut.find('button');
    expect(buttons.length).toBe(12);
  });

  it('calls the second button with correct value', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(mockFn);
    const buttons = sut.find('button');
    // Act
    buttons.at(3).simulate('click');
    // Assert
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(15);
  });
});
