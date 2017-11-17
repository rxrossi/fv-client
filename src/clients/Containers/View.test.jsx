import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import * as API_URLS from '../../APIInfo';
import clients from '../../clients/reducer/index';
import View from './View';

// Configure Enzyme
configure({ adapter: new Adapter() });

describe('View Container', () => {
  it('componentDidMount fetchs data', () => {
    const reducer = combineReducers({
      clients,
    });
    const store = createStore(reducer, applyMiddleware(thunk));

    const App = () => (
      <Provider store={store}>
        <View />
      </Provider>
    );

    const payload = [
      { id: '1', name: 'John', phone: '9 9999 9898' },
      { id: '2', name: 'Mary', phone: '9 1111 2222' },
    ];

    fetchMock.mock(API_URLS.CLIENTS, {
      body: payload,
      headers: { 'content-type': 'application/json' },
    });

    mount(<App />);

    setImmediate(() => {
      expect(store.getState().clients.list).toEqual(payload);
    });
  });
});
