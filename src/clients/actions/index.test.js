import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as types from '../actionTypes';
import * as actions from './index';
import * as urls from '../../APIInfo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Clients action creators', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('fetch clients', () => {
    const payload = [
      { name: 'John', phone: '9 9898 7434' },
      { name: 'Mary', phone: '9 8787 1264' },
    ];

    fetchMock.get(urls.CLIENTS, {
      body: payload,
      headers: { 'content-type': 'application/json' },
    });

    const initialState = {};
    const store = mockStore(initialState);
    const actionsExpected = [
      { type: types.FETCH_REQUEST },
      { type: types.FETCH_SUCCESS, payload },
    ];

    return store.dispatch(actions.fetchClients())
      .then(() => {
        expect(store.getActions()).toEqual(actionsExpected);
      });
  });

  it('add a client', () => {
    const client = {
      name: 'Jhon',
      phone: '999',
    };

    fetchMock.restore().post((url, opts) => (
      url === urls.CLIENTS
      && opts
      && opts.body === JSON.stringify(client)
    ), { body: client });

    const initialState = {};
    const store = mockStore(initialState);
    const actionsExpected = [
      { type: types.ADD_REQUEST },
      { type: types.ADD_SUCCESS, payload: client },
    ];

    return store.dispatch(actions.addClient(client))
      .then(() => {
        expect(store.getActions()).toEqual(actionsExpected);
      });
  });
});
