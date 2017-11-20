import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from '../../App';
import { NO_CLIENTS_P_CLASS } from '../../clients/Components/View';

// Configure Enzyme
configure({ adapter: new Adapter() });

const HOME_TEXT = 'This is home';
const CLIENTS_TEXT = 'No clients';

describe('App acceptance test', () => {
  beforeAll(() => {
    fetchMock.mock('*', { // if not present, test throws
      body: [],
    });
  });

  describe('Mounting tests', () => {
    it('renders', () => {
      mount(<App />);
    });

    it('has the home text', () => {
      const sut = mount(<App />);
      expect(sut.contains(HOME_TEXT)).toBe(true);
    });

    it('has a link to clients that works', () => {
      const sut = mount(<App />);
      const clientsLink = sut.find('a[href="/clients"]');
      expect(clientsLink.length).toBe(1);

      expect(sut.contains(HOME_TEXT)).toBe(true);
      expect(sut.contains(CLIENTS_TEXT)).toBe(false);

      clientsLink.simulate('click', { button: 0 });

      expect(sut.contains(HOME_TEXT)).toBe(false);
      expect(sut.find(`.${NO_CLIENTS_P_CLASS}`).length).toBe(1);
    });
  });
});
