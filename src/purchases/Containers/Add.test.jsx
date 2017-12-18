import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Add from './Add';
import purchases from '../reducer';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountContainer() {
  const reducer = combineReducers({
    purchases,
  });
  const store = createStore(reducer);
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
