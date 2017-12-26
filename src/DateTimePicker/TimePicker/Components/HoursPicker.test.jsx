import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import HoursPicker from './HoursPicker';
// Configure Enzyme
configure({ adapter: new Adapter() });

const mountComponent = handleClick => mount(<HoursPicker handleClick={handleClick} />);

describe('Hours Picker', () => {
  it('mounts', () => {
    mountComponent(() => {});
  });

  it('renders 24 buttons', () => {
    const sut = mountComponent(() => {});
    const buttons = sut.find('button');
    expect(buttons.length).toBe(24);
  });

  it('calls the second button with correct value', () => {
    const mockFn = jest.fn();
    const sut = mountComponent(mockFn);
    const buttons = sut.find('button');
    // Act
    buttons.at(3).simulate('click');
    // Assert
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(3);
  });
});
