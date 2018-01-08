import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { Add } from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });


function mountComponent({
  addClient,
  changeField,
  clearFields,
  values,
  errors,
} = {}) {
  const mockFn = () => {};


  return mount(<Add
    addClient={addClient || mockFn}
    changeField={changeField || mockFn}
    clearFields={clearFields || mockFn}
    values={values || {}}
    errors={errors || {}}
  />);
}

describe('Add Container', () => {
  it('render', async () => {
    mountComponent();
  });

  describe('Container methods', () => {
    it('class addClient correctly', () => {
      // Prepare
      const mockSubmit = jest.fn();
      const mockEvt = {
        preventDefault: jest.fn(),
      };
      const props = {
        values: {
          name: 'a name',
          phone: '999',
        },
        addClient: mockSubmit,
      };
      const sut = mountComponent(props);

      // Act
      sut.instance().submit(mockEvt);

      // Assert
      expect(mockSubmit).toHaveBeenCalledWith(props.values);
      expect(mockEvt.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('calls changeField correctly', () => {
      // Prepare
      const mockChangeField = jest.fn();
      const props = {
        changeField: mockChangeField,
      };
      const sut = mountComponent(props);
      // Act
      const evt = {
        target: { value: 'a name' },
      };
      sut.instance().handleChange('name')(evt);
      // Assert
      expect(mockChangeField).toHaveBeenCalledTimes(1);
      expect(mockChangeField).toHaveBeenCalledWith('name', 'a name');
    });
  });
});

