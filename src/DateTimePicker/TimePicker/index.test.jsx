import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import TimePicker from './index';
import ClockView from './Components/ClockView';
import HoursPicker from './Components/HoursPicker';
import MinutesPicker from './Components/MinutesPicker';
// Configure Enzyme
configure({ adapter: new Adapter() });

// Following the browsers standard, the return value
// will be a string in the format "hh:mm"

const mountComponent = (time = '10:30', onChange = () => {}) =>
  mount(<TimePicker time={time} onChange={onChange} />);

describe('TimePicker', () => {
  it('mounts', () => {
    mountComponent();
  });

  describe('Display changing', () => {
    it('starts with ClockView', () => {
      const sut = mountComponent();
      expect(sut.find(ClockView).length).toBe(1);
    });

    it('shows HoursPicker when clicking hours', () => {
      const sut = mountComponent();
      const hoursBtn = sut.find('button.hours-btn');
      // Act
      hoursBtn.simulate('click');
      // Assert
      expect(sut.find(HoursPicker).length).toBe(1);
    });

    it('shows MinutesPicker when clicking minutes', () => {
      const sut = mountComponent();
      const hoursBtn = sut.find('button.minutes-btn');
      // Act
      hoursBtn.simulate('click');
      // Assert
      expect(sut.find(MinutesPicker).length).toBe(1);
    });
  });

  describe('ClockView functionality', () => {
    it('calls callback correctly on click of button to increase hours', () => {
      // Prepare
      const time = '10:30';
      const mockFn = jest.fn();
      const sut = mountComponent(time, mockFn);
      const hoursPlusBtn = sut.find('button.hours-plus-btn');
      // Act
      hoursPlusBtn.simulate('click');
      // Assert
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('11:30');
    });

    it('calls callback correctly on click of button to decrease hours', () => {
      // Prepare
      const time = '10:30';
      const mockFn = jest.fn();
      const sut = mountComponent(time, mockFn);
      const hoursMinusBtn = sut.find('button.hours-minus-btn');
      // Act
      hoursMinusBtn.simulate('click');
      // Assert
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('09:30');
    });

    it('calls callback correctly on click of button to increase minutes', () => {
      // Prepare
      const time = '10:30';
      const mockFn = jest.fn();
      const sut = mountComponent(time, mockFn);
      const minutesPlusBtn = sut.find('button.minutes-plus-btn');
      // Act
      minutesPlusBtn.simulate('click');
      // Assert
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('10:31');
    });

    it('calls callback correctly on click of button to decrease minutes', () => {
      // Prepare
      const time = '10:30';
      const mockFn = jest.fn();
      const sut = mountComponent(time, mockFn);
      const minutesMinusBtn = sut.find('button.minutes-minus-btn');
      // Act
      minutesMinusBtn.simulate('click');
      // Assert
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('10:29');
    });
  });

  describe('HoursPicker functionality', () => {
    it('changes time with adequate value', () => {
      // Prepare
      const time = '00:30';
      const mockFn = jest.fn();
      const sut = mountComponent(time, mockFn);
      const hoursBtn = sut.find('button.hours-btn');
      hoursBtn.simulate('click');
      // Act
      const twentyHoursBtn = sut.find('button').at(9);
      twentyHoursBtn.simulate('click');
      // Assert
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('09:30');
      expect(sut.find(ClockView).length).toBe(1);
    });
  });

  describe('MinutesPicker functionality', () => {
    it('changes time with adequate value', () => {
      // Prepare
      const time = '10:30';
      const mockFn = jest.fn();
      const sut = mountComponent(time, mockFn);
      const minutesBtn = sut.find('button.minutes-btn');
      minutesBtn.simulate('click');
      // Act
      const fiveMinBtn = sut.find('button').at(1);
      fiveMinBtn.simulate('click');
      // Assert
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('10:05');
      expect(sut.find(ClockView).length).toBe(1);
    });
  });
});
