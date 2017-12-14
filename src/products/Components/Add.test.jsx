import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent(submitFn = () => {}) {
  const reducer = combineReducers({
    form: formReducer,
  });
  const store = createStore(reducer);

  const App = () => (
    <Provider store={store}>
      <Add
        onSubmit={submitFn}
      />
    </Provider>
  );

  return mount(<App />);
}

describe('Products Add Component', () => {
  it('mounts', () => {
    mountComponent();
  });
});
