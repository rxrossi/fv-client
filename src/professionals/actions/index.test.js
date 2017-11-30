import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as API_URLS from '../../APIInfo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Professionals Actions', () => {
  const professionalsListExample = [
    { id: '1', name: 'Mary' },
    { id: '2', name: 'Carl' },
  ];

  describe('fetch actions', () => {
    afterAll(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('works when there are professional', () => {
      // prepare
      fetchMock.get(API_URLS.PROFESSIONALS, {
        body: {
          code: 200,
          body: professionalsListExample,
        },
      });
      const initialState = {};
      const store = mockStore(initialState);

      // act
      return store.dispatch(actions.fetchProfessionals()).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.fetchRequest(),
          actions.fetchSuccess(professionalsListExample),
        ]);
      });
    });
  });

  describe('add actions', () => {
    afterAll(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('works with valid inputs', () => {
      // prepare
      const carl = { name: 'Carl' };

      fetchMock.post((url, opts) => (
        url === API_URLS.PROFESSIONALS
        && opts
        && opts.body === JSON.stringify(carl)
      ), {
        body: {
          code: 201,
          body: carl,
        },
      });

      const initialState = {};
      const store = mockStore(initialState);

      // act
      return store.dispatch(actions.addProfessional(carl)).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.addRequest(),
          actions.addSuccess(carl),
        ]);
      });
    });

    it('works for invalid input', () => {
      // Prepare
      const errors = {
        name: 'NOT_UNIQUE',
      };
      fetchMock.post((url, opts) => (
        url === API_URLS.PROFESSIONALS
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
      return store.dispatch(actions.addProfessional('')).then(() => {
        // assert
        expect(store.getActions()).toEqual([
          actions.addRequest(),
          actions.addError(errors),
        ]);
      });
    });
  });
});