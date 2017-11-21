import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App, { store } from '../../App';
import * as API_URLS from '../../APIInfo';
import { NO_CLIENTS_P_CLASS } from '../../clients/Components/View';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Clients acceptance test', () => {
  describe('No clients yet', () => {
    let sut;

    beforeEach((done) => {
      fetchMock.get('*', {
        body: {
          code: 200,
          body: [],
        },
      });
      sut = mount(<App />);
      sut.find('a[href="/clients"]').simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('has a form', () => {
      const form = sut.find('form');
      expect(form.length).toBe(1);
    });

    it('has a message saying that no clients were found', () => {
      expect(sut.find(`.${NO_CLIENTS_P_CLASS}`).length).toBe(1);
    });
  });

  describe('Form submit success case', () => {
    let sut;
    let nameInpt;
    let phoneInpt;
    let submitBtn;

    const clientExample = {
      name: 'John',
      phone: '999',
    };

    beforeAll(async (done) => {
      fetchMock
        .get(API_URLS.CLIENTS, {
          code: 200,
          body: [],
        });

      fetchMock.post(
        (url, opts) =>
          url === API_URLS.CLIENTS
          && opts
          && opts.body === JSON.stringify(clientExample)
        ,
        {
          body: {
            body: {
              ...clientExample,
              id: '3',
            },
            code: 201,
          },
        },
      );

      // Go to Clients page
      sut = await mount(<App />);
      sut.find('a[href="/clients"]').simulate('click', { button: 0 });

      await setImmediate(() =>
        Promise.resolve());

      // Fill up form and submit
      sut.find('input[name="name"]')
        .simulate('change', { target: { value: clientExample.name } });
      sut.find('input[name="phone"]')
        .simulate('change', { target: { value: clientExample.phone } });

      sut.find('form').simulate('submit');

      await setImmediate(() => done());
    });

    afterAll(() => {
      fetchMock.restore();
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
      expect(fetchMock.calls().matched.length).toBe(2);
    });

    it('clears the field on submit', () => {
      expect(sut.find('input[name="name"]').props().value).toEqual('');
      expect(sut.find('input[name="phone"]').props().value).toEqual('');
    });

    it('shows the recently added user', () => {
      expect(sut.text()).toMatch(clientExample.name);
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
        .get(API_URLS.CLIENTS, {
          body: {
            code: 200,
            body: clientsListExample,
          },
        });

      sut = mount(<App />);
      sut.find('a[href="/clients"]').simulate('click', { button: 0 });

      setImmediate(() =>
        done());
    });

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
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
