import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as urls from '../../APIInfo';
import * as types from '../actionTypes';
import * as actions from './index';

describe('Products action tests', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('works on fetchSuccess', () => {
    const payload = [
      { id: '1', name: 'OX', measure_unit: 'ml' },
      { id: '2', name: 'Shampoo', measure_unit: 'ml' },
      { id: '3', name: 'Capes', measure_unit: 'unit' },
    ];

    fetchMock.get(urls.PRODUCTS, {
      body: {
        code: 200,
        body: payload,
      },
      headers: { 'content-type': 'application/json' },
    });

    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    const initialState = {};
    const store = mockStore(initialState);
    const actionsExpected = [
      { type: types.FETCH_REQUEST },
      { type: types.FETCH_SUCCESS, payload },
    ];

    return store.dispatch(actions.fetchProducts())
      .then(() => {
        expect(store.getActions()).toEqual(actionsExpected);
      });
  });
});
