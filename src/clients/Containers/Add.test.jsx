import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { Add } from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });


function mountComponent({
  submit,
  changeField,
  clearFields,
  fieldValues,
  errors,
} = {}) {
  const mockFn = () => {};


  return mount(<Add
    submit={submit || mockFn}
    changeField={changeField || mockFn}
    clearFields={clearFields || mockFn}
    fieldValues={fieldValues || {}}
    errors={errors || {}}
  />);
}

describe('Add Container', () => {
  it('render', async () => {
    mountComponent();
  });
});

