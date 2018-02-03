import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { Edit } from '../../clients/Containers/Edit';
import { Add } from '../../clients/Containers/Add';
import App from '../../App';
import List from '../../clients/Containers/List';
import * as API_URLS from '../../APIInfo';

const clientList = [
  { id: '1', name: 'Mary', phone: '999' },
  { id: '2', name: 'July', phone: '888' },
];

// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Clients acceptance test', () => {
  let sut;
  afterEach(() => {
    fetchMock.restore();
  });
  beforeEach((done) => {
    // setting up the fake server response
    fetchMock.get(API_URLS.CLIENTS, {
      body: {
        statusCode: 200,
        body: clientList,
      },
    });
    // Going to Clients page
    sut = mount(<App />);
    sut.find('a[href="/clients"]').simulate('click', { button: 0 });
    setImmediate(() => done());
  });

  describe('Initial page', () => {
    it('loads the correct components', () => {
      expect(sut.find(List).length).toBe(1);
      expect(sut.find(Add).length).toBe(1);
    });
  });

  describe('Going to edit view', () => {
    beforeEach((done) => {
      sut.find(`a[href="/clients/${clientList[0].id}/edit"]`).simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    it('loads the correct container', () => {
      sut.update();
      expect(sut.find(Edit).length).toBe(1);
    });
  });
});
