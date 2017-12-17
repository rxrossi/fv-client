import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import View from './View';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Component view', () => {
  describe('No professionals yet', () => {
    it('shows a message saying that no professionals are registered', () => {
      // Prepare
      const sut = mount(<View />);
      // Assert
      expect(sut.text()).toMatch('No professionals yet, register some');
    });
  });

  describe('With professionals', () => {
    const professionalsListExample = [
      { id: '1', name: 'Mary' },
      { id: '2', name: 'Carl' },
    ];

    it('renders both clients', () => {
      // Prepare
      const sut = mount(<View professionals={professionalsListExample} />);
      // Assert
      expect(sut.text()).toMatch(professionalsListExample[0].name);
      expect(sut.text()).toMatch(professionalsListExample[1].name);
    });
  });
});
