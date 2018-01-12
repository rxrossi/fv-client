import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import editHOC from './Edit';
// Configure Enzyme
configure({ adapter: new Adapter() });

const SomePresentational = () => (
  <p>Presentational component</p>
);

function mountComponent({
  setFields,
  entityId,
  entities,
  fieldValues,
  changeField,
} = {}) {
  const Edit = editHOC(SomePresentational);

  return mount(<Edit
    entityId={entityId || 'e1'}
    entities={entities || []}
    fieldValues={fieldValues || {}}
    setFields={setFields || (() => {})}
    changeField={changeField || (() => {})}
  />);
}

describe('Edit HOC', () => {
  it('mounts and has the presentational component', () => {
    // Prepare
    // Act
    const sut = mountComponent();
    // Assert
    expect(sut.find(SomePresentational).length).toBe(1);
  });

  describe('Filling fields with initial data', () => {
    xit('calls the fetchEntities function on mount', () => {

    });

    it('expect it calls the setFields with the right entity', () => {
      // Prepare
      const entities = [
        { id: 'e1', name: 'name1' },
        { id: 'e2', name: 'name2' },
      ];
      const setFields = jest.fn();

      // Act
      // in this case
      // entitityId could when it is mounted by a component aware of react-router
      // entities would come from redux store
      mountComponent({
        entities, entityId: 'e2', setFields,
      });

      // Assert
      expect(setFields).toHaveBeenCalledTimes(1);
      expect(setFields).toHaveBeenCalledWith(entities[1]);
    });

    it('calls setfields if entities is updated after the mount', () => {
      // Prepare
      const setFields = jest.fn();
      const sut = mountComponent({
        entityId: 'e1', entities: [], setFields,
      });

      // Act
      const entities = [
        { id: 'e1', name: 'name1' },
        { id: 'e2', name: 'name2' },
      ];
      sut.setProps({ entities });
      // Assert
      expect(setFields).toHaveBeenCalledWith(entities[0]);
    });

    it('does not call setFields if after props change but values.id is equal to the entityId', () => {
      // Prepare
      const entities = [
        { id: 'e1', name: 'name1' },
        { id: 'e2', name: 'name2' },
      ];
      const setFields = jest.fn();
      const sut = mountComponent({
        entities, entityId: 'e2', setFields, fieldValues: entities[1],
      });
      setFields.mockClear();

      // Act
      sut.setProps({ entities });

      // Assert
      expect(setFields).toHaveBeenCalledTimes(0);
    });
  });

  describe('Changing a field', () => {
    it('calls the correct prop when the presentational component calls its handleMethod', () => {
      // Prepare
      const changeField = jest.fn();
      const sut = mountComponent({ changeField });
      // Act
      sut.instance().handleChange('name')({ target: { value: 'someVal' } });
      // Assert
      expect(changeField).toHaveBeenCalledTimes(1);
      expect(changeField).toHaveBeenCalledWith('name', 'someVal');
    });

    it('passes handleChange method to Presentational', () => {
      // Prepare
      const sut = mountComponent();
      // Assert
      expect(typeof sut.find(SomePresentational).props().handleChange).toBe('function');
    });
  });

  describe('Appending a dynamic field', () => {
    it('calls the correct prop', () => {
      // Prepare

      // Act

      // Assert
    });
  });

  describe('Removing a dynamic field', () => {
    it('calls the correct prop', () => {
      // Prepare

      // Act

      // Assert
    });
  });

  describe('Reseting the form', () => {
    xit('calls the correct prop', () => {
      // Prepare

      // Act

      // Assert
    });
  });

  describe('Canceling the edit', () => {
    xit('renders the redirect component', () => {
      // Prepare

      // Act

      // Assert
    });
  });

  describe('PUT method', () => {
    xit('calls the correct prop function with the correct values', () => {
      // Prepare

      // Act

      // Assert
    });
  });
});
