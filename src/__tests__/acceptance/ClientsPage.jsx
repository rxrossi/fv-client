import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App, { store } from '../../App';
import * as API_URLS from '../../APIInfo';
import { NO_CLIENTS_P_CLASS } from '../../clients/Components/View';
// Configure Enzyme
configure({ adapter: new Adapter() });

fetchMock.mock('*', {
  body: [],
});

describe('Clients acceptance test', () => {
  describe('No clients yet', () => {
    let sut;

    beforeAll(() => {
      sut = mount(<App />);
      sut.find('a[href="/clients"]').simulate('click', { button: 0 });
    });

    it('has a form', () => {
      const form = sut.find('form');
      expect(form.length).toBe(1);
    });

    it('has a message saying that no clients were found', () => {
      expect(sut.find(`.${NO_CLIENTS_P_CLASS}`).length).toBe(1);
    });
  });

  describe('Using the form to submit', () => {
    let sut;
    let nameInpt;
    let phoneInpt;
    let submitBtn;

    beforeAll(() => {
      sut = mount(<App />);
      sut.find('a[href="/clients"]').simulate('click', { button: 0 });
    });

    afterEach(() => {
      fetchMock.reset();
    });

    it('has name and phone inputs and a submit button', () => {
      nameInpt = sut.find('input[name="name"]');
      phoneInpt = sut.find('input[name="phone"]');
      submitBtn = sut.find('button[type="submit"]');

      expect(nameInpt.length).toBe(1);
      expect(phoneInpt.length).toBe(1);
      expect(submitBtn.length).toBe(1);
    });

    it('calls the API with expected data on submit', () => {
      const clientExample = {
        name: 'John',
        phone: '999',
      };

      fetchMock.restore().post(
        (url, opts) =>
          url === API_URLS.CLIENTS
          && opts
          && opts.body === JSON.stringify(clientExample)
        , '{}',
      );

      nameInpt.simulate('change', { target: { value: clientExample.name } });
      phoneInpt.simulate('change', { target: { value: clientExample.phone } });
      sut.find('form').simulate('submit');

      expect(fetchMock.calls().matched.length).toBe(1);
    });
  });

  describe('With Clients', () => {
    const clientsListExample = [
      { id: '1', name: 'John', phone: '9 9999 9898' },
      { id: '2', name: 'Mary', phone: '9 1111 2222' },
    ];

    let sut;

    beforeEach((done) => {
      fetchMock
        .restore()
        .mock(API_URLS.CLIENTS, {
          body: clientsListExample,
        });

      sut = mount(<App />);
      sut.find('a[href="/clients"]').simulate('click', { button: 0 });

      setImmediate(() => {
        done();
      });
    });

    it('the store has the clients', () => {
      expect(store.getState().clients.list).toEqual(clientsListExample);
    });

    it('has the clients being listed', () => {
      expect(sut.text()).toMatch(clientsListExample[0].name);
      expect(sut.text()).toMatch(clientsListExample[1].name);
    });
  });
});
