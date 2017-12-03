import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as API_URLS from '../../APIInfo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const professional = {
  id: 'p1',
  name: 'ProOne',
};

const client = {
  id: 'p1',
  name: 'ClientOne',
};

const sale = {
  client,
  name: 'service one',
  value: '300',
  payment: 'money',
  date: '10 10 2017',
  start_time: '10:00',
  end_time: '16:00',
  professional,
  products: [
    { id: '1', qty: 10 },
    { id: '2', qty: 20 },
  ],
};
const sales = [sale];

describe('Sales Actions', () => {
  describe('fetch actions', () => {
    afterAll(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('works when there are sales', () => {
      // prepare
      fetchMock.get(API_URLS.SALES, {
        body: {
          code: 200,
          body: sales,
        },
      });
      const initialState = {};
      const store = mockStore(initialState);

      // act
      return store.dispatch(actions.fetchSales()).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.fetchRequest(),
          actions.fetchSuccess(sales),
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
      fetchMock.post((url, opts) => (
        url === API_URLS.SALES
        && opts
        && opts.body === JSON.stringify(sale)
      ), {
        body: {
          code: 201,
          body: sale,
        },
      });

      const initialState = {};
      const store = mockStore(initialState);

      // act
      return store.dispatch(actions.addSale(sale)).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.addRequest(),
          actions.addSuccess(sale),
        ]);
      });
    });

    it('works for invalid input', () => {
      // Prepare
      const errors = {
        name: 'NOT_UNIQUE',
      };
      fetchMock.post((url, opts) => (
        url === API_URLS.SALES
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
      return store.dispatch(actions.addSale('')).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.addRequest(),
          actions.addError(errors),
        ]);
      });
    });
  });
});
