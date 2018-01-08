import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { Edit } from './Edit';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent({
  editClient,
  changeField,
  clearFields,
  values,
  errors,
  clientId,
} = {}) {
  const mockFn = () => {};

  return mount(<Edit
    editClient={editClient || mockFn}
    changeField={changeField || mockFn}
    clearFields={clearFields || mockFn}
    values={values || {}}
    errors={errors || {}}
    clientId={clientId}
  />);
}

describe('Edit clients container', () => {
  it('mounts', () => {
    mountComponent({
      clientId: '1',
    });
  });
});
