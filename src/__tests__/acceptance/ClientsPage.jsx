import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { Edit } from '../../clients/Containers/Edit';
import FormComponent from '../../clients/Components/Form';
import ListComponent from '../../clients/Components/List';
import App from '../../App';
import * as API_URLS from '../../APIInfo';

const clientList = [
  { id: '1', name: 'Mary', phone: '999' },
  { id: '2', name: 'July', phone: '888' },
];

// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Clients acceptance test', () => {
  let sut;

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

  afterEach(() => {
    fetchMock.restore();
  });

  describe('Initial page', () => {
    it('loads the correct components', () => {
      sut.update();
      const ListMounted = sut.find(ListComponent);
      expect(ListMounted.length).toBe(1);
      expect(ListMounted.props().entities).toEqual(clientList);
      expect(sut.find(FormComponent).length).toBe(1);
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
