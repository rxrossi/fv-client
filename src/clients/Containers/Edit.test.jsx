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
  setFields,
  getClients,
  values,
  errors,
  clientId,
  clients,
} = {}) {
  const mockFn = () => {};

  return mount(<Edit
    editClient={editClient || mockFn}
    changeField={changeField || mockFn}
    clearFields={clearFields || mockFn}
    setFields={setFields || mockFn}
    getClients={getClients || mockFn}
    values={values || {}}
    errors={errors || {}}
    clientId={clientId}
    clients={clients || []}
  />);
}

describe('Edit clients container', () => {
  it('mounts', () => {
    mountComponent({
      clientId: '1',
    });
  });
});
