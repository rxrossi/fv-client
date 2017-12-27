import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import DatePicker from './DatePicker';
import DaysHeader from '../Components/Header';
import DayBtn from '../Components/Day';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountContainer(date, onChange = () => {}) {
  return mount(<DatePicker date={date} onChange={onChange} />);
}

describe('DatePicker', () => {
  it('mounts', () => {
    const date = new Date(2017, 11, 30, 9, 5);
    mountContainer(date);
  });

  describe('change viewMonth', () => {
    it('starts with correct month', () => {
      const date = new Date(2017, 11, 30, 9, 5);
      const sut = mountContainer(date);
      const Header = sut.find(DaysHeader);
      expect(Header.props().viewMonth).toEqual(11);
      expect(Header.text()).toMatch('December');
    });

    describe('next viewMonth', () => {
      it('can change to next view month from December to January', () => {
        const date = new Date(2017, 11, 30, 9, 5);
        const sut = mountContainer(date);
        let Header = sut.find(DaysHeader);
        const nextBtn = sut.find(DaysHeader).find('button.inc-view-month');

        // Act
        nextBtn.simulate('click');

        // Assert
        Header = sut.find(DaysHeader);
        expect(Header.props().viewMonth).toEqual(0);
        expect(Header.props().viewYear).toEqual(2018);
      });

      it('can change to next view month from January to February', () => {
        const date = new Date(2017, 0, 30, 9, 5);
        const sut = mountContainer(date);
        let Header = sut.find(DaysHeader);
        const nextBtn = sut.find(DaysHeader).find('button.inc-view-month');

        // Act
        nextBtn.simulate('click');

        // Assert
        Header = sut.find(DaysHeader);
        expect(Header.props().viewMonth).toEqual(1);
        expect(Header.props().viewYear).toEqual(2017);
      });
    });

    describe('previous viewMonth', () => {
      it('can change to next previous month from January to December', () => {
        const date = new Date(2017, 0, 30, 9, 5);
        const sut = mountContainer(date);
        let Header = sut.find(DaysHeader);
        const NextBtn = sut.find(DaysHeader).find('button.dec-view-month');

        // Act
        NextBtn.simulate('click');

        // Assert
        Header = sut.find(DaysHeader);
        expect(Header.props().viewMonth).toEqual(11);
        expect(Header.props().viewYear).toEqual(2016);
      });

      it('can change to previous view month from February to January', () => {
        const date = new Date(2017, 2, 30, 9, 5);
        const sut = mountContainer(date);
        let Header = sut.find(DaysHeader);
        const PrevBtn = sut.find(DaysHeader).find('button.dec-view-month');

        // Act
        PrevBtn.simulate('click');

        // Assert
        Header = sut.find(DaysHeader);
        expect(Header.props().viewMonth).toEqual(1);
        expect(Header.props().viewYear).toEqual(2017);
      });
    });
  });

  describe('Select a day', () => {
    it('works in a simple case', () => {
      const mockFn = jest.fn();
      const date = new Date(2017, 11, 30, 9, 5);
      const sut = mountContainer(date, mockFn);
      const Day3Btn = sut.find(DayBtn).at(7).find('button');

      // Act
      Day3Btn.simulate('click');

      // Assert
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith(new Date(2017, 11, 3));
    });
  });
});
