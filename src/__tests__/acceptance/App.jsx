import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from '../../App';

// Configure Enzyme
configure({ adapter: new Adapter() });

// const HOME_TEXT = 'This is home';

describe('App acceptance test', () => {
  beforeEach(() => {
    fetchMock.mock('*', { // if not present, test throws
      body: {
        statusCode: 200,
        body: [],
      },
    });
  });
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Mounting tests', () => {
    it('renders', () => {
      mount(<App />);
    });

    it('has a link to clients that works', () => {
      const sut = mount(<App />);
      // console.log(sut.debug());
      const clientsLink = sut.find('a[href="/clients"]');
      expect(clientsLink.length).toBe(1);

      // clientsLink.simulate('click', { button: 0 });

      // expect(sut.contains(HOME_TEXT)).toBe(false);
    });
  });
});
