import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import clients from '../reducer';
import Add from './Add';
import { changeFields, getFieldValue } from '../../test_helpers';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent() {
  const reducer = combineReducers({
    clients,
  });
  const store = createStore(reducer);

  const App = () => (
    <Provider store={store}>
      <Add />
    </Provider>
  );

  return mount(<App />);
}

describe('Add Container', () => {
  it('render', async () => {
    mountComponent();
  });

  it('changes the fields', () => {
    const name = 'Carl';
    const phone = '911';
    const sut = mountComponent();
    changeFields(sut, {
      name,
      phone,
    });
    expect(getFieldValue(sut, 'name')).toEqual(name);
    expect(getFieldValue(sut, 'phone')).toEqual(phone);
  });
});
