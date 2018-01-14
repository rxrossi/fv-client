import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import viewDetailsHOC from './ViewDetails';
// Configure Enzyme
configure({ adapter: new Adapter() });

const SomePresentational = () => (
  <p>Presentational component</p>
);

function mountComponent({
  entityId,
  entities,
  fetchEntities,
} = {}) {
  const ViewDetails = viewDetailsHOC(SomePresentational);

  return mount(<ViewDetails
    entityId={entityId || 'e1'}
    entities={entities || []}
    fetchEntities={fetchEntities || (() => {})}
  />);
}

describe('ViewDetails HOC', () => {
  it('mounts and has the presentational component', () => {
    // Prepare
    // Act
    const sut = mountComponent();
    // Assert
    expect(sut.find(SomePresentational).length).toBe(1);
  });

  describe('Passing the correct entity to the presentational', () => {
    it('calls the fetchEntities function on mount', () => {
      const fetchEntities = jest.fn();
      mountComponent({ fetchEntities });
      expect(fetchEntities).toHaveBeenCalledTimes(1);
    });

    it('pass the correct entity to the presentational', () => {
      // Prepare
      const entities = [
        { id: 'e1', name: 'name1' },
        { id: 'e2', name: 'name2' },
      ];
      // Act
      // in this case
      // entitityId could when it is mounted by a component aware of react-router
      // entities would come from redux store
      const sut = mountComponent({ entities, entityId: 'e2' });

      // Assert
      expect(sut.find(SomePresentational).props().entity).toEqual(entities[1]);
    });

    it('pass the correct entity even if the entities are passed after mount', () => {
      // Prepare
      const entities = [
        { id: 'e1', name: 'name1' },
        { id: 'e2', name: 'name2' },
      ];
      const sut = mountComponent({ entityId: 'e2' });

      // Act
      sut.setProps({ entities });

      // Assert
      expect(sut.find(SomePresentational).props().entity).toEqual(entities[1]);
    });
  });
});
