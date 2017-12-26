import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import TimePicker from './Index';
import ClockView from './Components/ClockView';
import HoursPicker from './Components/HoursPicker';
import MinutesPicker from './Components/MinutesPicker';
// Configure Enzyme
configure({ adapter: new Adapter() });

// Following the browsers standard, the return value
// will be a string in the format "hh:mm"

const mountComponent = (time = '10:30') =>
  mount(<TimePicker time={time} />);

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

    });

    it('calls callback correctly on click of button to decrease hours', () => {

    });

    it('calls callback correctly on click of button to increase minutes', () => {

    });

    it('calls callback correctly on click of button to decrease minutes', () => {

    });
  });

  describe('HoursPicker functionality', () => {

  });

  describe('MinutesPicker functionality', () => {
    <`0`>
  });
});
