import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App from '../../App';
import * as API_URLS from '../../APIInfo';
// Configure Enzyme

configure({ adapter: new Adapter() });

describe('Purchases Page', () => {
  let sut;
  beforeEach((done) => {
    sut = mount(<App />);
    sut.find('a[href="/purchases"]').simulate('click', { button: 0 });
    setImmediate(() => done());
  });

  it('renders a form', () => {
    expect(sut.find('form').length).toBe(1);
  });
});
