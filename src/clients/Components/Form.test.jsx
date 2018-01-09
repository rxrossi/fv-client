import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Form from './Form';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountComponent({
  handleChange,
  handleReset,
  handleSubmit,
  values,
  errors,
} = {}) {
  const mockFn = () => {};
  return mount(<Form
    handleSubmit={handleSubmit || mockFn}
    handleChange={handleChange || mockFn}
    handleReset={handleReset || mockFn}
    values={errors || {}}
    errors={values || {}}
  />);
}

describe('Form Client', () => {
  it('renders', () => {
    mountComponent();
  });

  it('calls handleSubmit when clicking submit', () => {
    // Prepare
    const props = {
      handleSubmit: jest.fn(),
    };
    const sut = mountComponent(props);

    // Act
    sut.find('Form').simulate('submit');

    // Assert
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls handleReset when clicking the clear button', () => {
    // Prepare
    const props = {
      handleReset: jest.fn(),
    };
    const sut = mountComponent(props);

    // Act
    const clearBtn = sut.find('button.clearBtn');
    clearBtn.simulate('click');

    // Assert
    expect(props.handleReset).toHaveBeenCalledTimes(1);
  });

  it('calls handleReset when changing a field', () => {
    // Prepare
    const mockHandleChange = jest.fn();
    const props = {
      handleChange: () => mockHandleChange,
    };
    const sut = mountComponent(props);

    // Act
    const aInput = sut.find('input[name="name"]');
    aInput.simulate('change', { target: { value: 'a value' } });

    // Assert
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });
});
