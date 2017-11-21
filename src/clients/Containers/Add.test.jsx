import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import clients from '../../reducer';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });


describe('Add Container', () => {
  it('render', () => {
    const reducer = combineReducers({
      form: formReducer,
      clients,
    });
    const store = createStore(reducer);

    const App = () => (
      <Provider store={store}>
        <Add />
      </Provider>
    );

    mount(<App />);
  });
});
