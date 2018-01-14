import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent() {
  const reducer = combineReducers({
    products: () => ({}),
  });
  const store = createStore(reducer);

  const App = () => (
    <Provider store={store}>
      <Add />
    </Provider>
  );

  return mount(<App />);
}

describe('Products Add Component', () => {
  it('mounts', () => {
    mountComponent();
  });
});
