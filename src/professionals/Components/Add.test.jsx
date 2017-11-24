import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Professionals Add Form', () => {
  const errorsObj = {
    name: 'NOT_UNIQUE',
  };

  const errorMsg = 'A professional with this name already exists';

  it('renders without error messages', () => {
    const reducer = combineReducers({
      form: formReducer,
    });
    const store = createStore(reducer);

    /* eslint-disable */
    const sut = mount(
      <Provider store={store}>
        <Add handleSubmit={() => {}} errors={{}}/>
      </Provider>
    );
    /* eslint-enable */
    expect(sut.text()).not.toMatch(errorMsg);
  });

  it('renders error messages if a valid object is passed', () => {
    const reducer = combineReducers({
      form: formReducer,
    });
    const store = createStore(reducer);

    /* eslint-disable */
    const sut = mount(
      <Provider store={store}>
        <Add handleSubmit={() => {}} errors={errorsObj}/>
      </Provider>
    );
    /* eslint-enable */
    expect(sut.text()).toMatch(errorMsg);
  });
});
