import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Add from './Add';
import purchases from '../reducer';
import products from '../../products/reducer';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountContainer() {
  const reducer = combineReducers({
    purchases,
    products,
  });
  const store = createStore(reducer, applyMiddleware(thunk));
  const App = () => (
    <Provider store={store}>
      <Add />
    </Provider>
  );
  return mount(<App />);
}

describe('Purchases Add Component', () => {
  it('mounts', () => {
    mountContainer();
  });
});
