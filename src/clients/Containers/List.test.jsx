import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import reusableReduxConfig from 'reusablecrudredux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import * as API_URLS from '../../APIInfo';
import List from './List';


const clients = reusableReduxConfig(API_URLS.CLIENTS, 'clients').reducer;

// Configure Enzyme
configure({ adapter: new Adapter() });

describe('List Container', () => {
  let store;
  const clientsList = [
    { id: '1', name: 'John', phone: '9 9999 9898' },
    { id: '2', name: 'Mary', phone: '9 1111 2222' },
  ];

  beforeAll((done) => {
    const reducer = combineReducers({
      clients,
    });
    store = createStore(reducer, applyMiddleware(thunk));

    const App = () => (
      <Provider store={store}>
        <Router>
          <List />
        </Router>
      </Provider>
    );

    fetchMock.restore().get(API_URLS.CLIENTS, {
      body: {
        code: 200,
        body: clientsList,
      },
      headers: { 'content-type': 'application/json' },
    });

    mount(<App />);

    setImmediate(() => done());
  });
  it('componentDidMount fetchs data', () => {
    expect(store.getState().clients.entities).toEqual(clientsList);
  });
});
