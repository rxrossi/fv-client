import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as API_URLS from '../../APIInfo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Professionals Actions', () => {
  const purchase = {
    products: [
      { id: '1', qty: 1, price: 10 },
      { id: '2', qty: 2, price: 20 },
    ],
    seller: 'Company one',
    date: '10 27 2017',
  };

  const purchases = [purchase];

  describe('fetch actions', () => {
    afterAll(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('works when there are purchases', () => {
      // prepare
      fetchMock.get(API_URLS.PURCHASES, {
        body: {
          code: 200,
          body: purchases,
        },
      });
      const initialState = {};
      const store = mockStore(initialState);

      // act
      return store.dispatch(actions.fetchPurchases()).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.fetchRequest(),
          actions.fetchSuccess(purchases),
        ]);
      });
    });
  });

  describe('add action', () => {
    afterAll(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('works with valid inputs', () => {
      // prepare
      const dataExample = {
        products: [
          { id: '1', qty: 1, price: 10 },
          { id: '2', qty: 2, price: 20 },
        ],
        seller: 'Company one',
        date: '10 27 2017',
      };

      fetchMock.post((url, opts) => (
        url === API_URLS.PURCHASES
        && opts
        && opts.body === JSON.stringify(dataExample)
      ), {
        body: {
          code: 201,
          body: dataExample,
        },
      });

      const initialState = {};
      const store = mockStore(initialState);

      // act
      return store.dispatch(actions.addPurchase(dataExample)).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.addRequest(),
          actions.addSuccess(dataExample),
        ]);
      });
    });

    it('works for invalid input', () => {
      // Prepare
      const errors = {
        name: 'NOT_UNIQUE',
      };
      fetchMock.post((url, opts) => (
        url === API_URLS.PURCHASES
        && opts
      ), {
        body: {
          code: 422,
          errors,
        },
      });

      const initialState = {};
      const store = mockStore(initialState);

      // act
      return store.dispatch(actions.addPurchase('')).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.addRequest(),
          actions.addError(errors),
        ]);
      });
    });
  });
});
