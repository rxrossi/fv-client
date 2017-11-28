import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Purchases Add component', () => {
  it('renders', () => {
    const reducer = combineReducers({
      form: formReducer,
    });
    const store = createStore(reducer);
    const App = () => (
      <Provider store={store}>
        <Add />
      </Provider>
    );
    const sut = mount(<App />);

    expect(sut.length).toBe(1);
  });
});
