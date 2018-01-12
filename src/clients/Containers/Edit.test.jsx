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
    submit={editClient || mockFn}
    changeField={changeField || mockFn}
    clearFields={clearFields || mockFn}
    setFields={setFields || mockFn}
    fetchEntities={getClients || mockFn}
    fieldValues={values || {}}
    errors={errors || {}}
    entityId={clientId}
    entities={clients || []}
  />);
}

describe('Edit clients container', () => {
  it('mounts', () => {
    mountComponent({
      clientId: '1',
    });
  });
});
