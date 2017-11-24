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
});
