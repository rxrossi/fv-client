import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import DeleteModal from './index';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent({
  entityName,
  deleteFn,
} = {}) {
  return mount(<DeleteModal open entityName={entityName || 'Entity'} deleteFunction={deleteFn || (() => {})} />);
}

describe('Delete Modal', () => {
  it('mounts', () => {
    mountComponent();
  });
});
