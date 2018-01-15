import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import createHOC from './Create';
// Configure Enzyme
configure({ adapter: new Adapter() });

const SomePresentational = () => (
  <p>Presentational component</p>
);

function mountComponent({
  changeField,
  appendField,
  removeField,
  fieldValues,
  clearFields,
  errors,
  submit,
  passProps,
  ...others
} = {}) {
  const Create = createHOC(SomePresentational, passProps);

  return mount(<Create
    changeField={changeField || (() => {})}
    appendField={appendField || (() => {})}
    removeField={removeField || (() => {})}
    fieldValues={fieldValues || {}}
    errors={errors || {}}
    clearFields={clearFields || (() => {})}
    submit={submit || (() => {})}
    {...others}
  />);
}

describe('Create HOC', () => {
  it('mounts and has the presentational component', () => {
    // Prepare
    // Act
    const sut = mountComponent();
    // Assert
    expect(sut.find(SomePresentational).length).toBe(1);
  });
  describe('Passing custom props', () => {
    it('pass props to the presentational', () => {
      // Prepare
      const additionalEntities1 = ['one', 'two', 'three'];
      const additionalEntities2 = ['1', '2', '3'];
      const passProps = ['additionalEntities1', 'additionalEntities2'];

      // Act
      const sut = mountComponent({ additionalEntities1, additionalEntities2, passProps });

      // Assert
      expect(sut.find(SomePresentational).props().additionalEntities1).toEqual(additionalEntities1);
      expect(sut.find(SomePresentational).props().additionalEntities2).toEqual(additionalEntities2);
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
      const appendField = jest.fn();
      const sut = mountComponent({ appendField });
      const nameOfArray = 'name of array';
      const objectToAppend = {};
      // Act
      sut.instance().handleAppendField(nameOfArray, objectToAppend);
      // Assert
      expect(appendField).toHaveBeenCalledWith(nameOfArray, objectToAppend);
    });
  });

  describe('Removing a dynamic field', () => {
    it('calls the correct prop', () => {
      // Prepare
      const removeField = jest.fn();
      const sut = mountComponent({ removeField });
      const path = 'some path';
      // Act
      sut.instance().handleRemoveField(path);
      // Assert
      expect(removeField).toHaveBeenCalledWith(path);
    });
  });

  describe('Clearing the fields and errors', () => {
    it('calls the correct prop', () => {
      // Prepare
      const clearFields = jest.fn();
      const sut = mountComponent({ clearFields });

      // Act
      sut.instance().handleReset();

      // Assert
      expect(clearFields).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST method', () => {
    it('calls the correct prop function with the correct values', () => {
      // Prepare
      const submit = jest.fn();
      const fieldValues = { id: 'e2', name: 'name2' };
      const sut = mountComponent({ fieldValues, submit });

      const evt = { preventDefault: () => {} };
      // Act
      sut.instance().handleSubmit(evt);

      // Assert
      expect(submit).toHaveBeenCalledWith(fieldValues);
    });
  });
});
