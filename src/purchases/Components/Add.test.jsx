import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

const dummyFn = () => {};

const productsList = [
  {
    id: '1',
    name: 'OX',
    measure_unit: 'ml',
    quantity: 850,
    price: 0.09, // per unit
    avgPriceFiveLast: 0.08, // per unit
  },
  {
    id: '2',
    name: 'Shampoo',
    measure_unit: 'ml',
    quantity: 1805,
    price: 0.01,
    avgPriceFiveLast: 0.02, // per unit
  },
  {
    id: '3',
    name: 'Capes',
    measure_unit: 'unit',
    quantity: 99,
    price: 1,
    avgPriceFiveLast: 1.2, // per unit
  },
];

const defaultValues = {
  products: [
    {}, {},
  ],
};

// TODO: ADD removeField
const mountComponent = (
  values = defaultValues,
  errors = {},
  handleChange = dummyFn,
  handleSubmit = dummyFn,
  addField = dummyFn,
  removeField = dummyFn,
) => mount(<Add
  products={productsList}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  addField={addField}
  removeField={removeField}
  values={values}
  errors={errors}
/>);


describe('Purchases Add component', () => {
  it.only('renders', () => {
    const sut = mountComponent();
    expect(sut.length).toBe(1);
  });

  describe.only('Handling dinamic fields', () => {
    it.only('has an add-product button', () => {
      const sut = mountComponent();
      const addBtn = sut.find('button.add-product');
      expect(addBtn.length).toBe(1);
    });

    it.only('calls the add-product with correct values', () => {
      const fakeAddProduct = jest.fn();
      const sut = mountComponent({}, {}, dummyFn, dummyFn, fakeAddProduct);
      sut.find('button.add-product').simulate('click');
      expect(fakeAddProduct).toHaveBeenCalled();
    });

    it.only('calls the remove-product with correct values', () => {
      const fakeRemoveProduct = jest.fn();
      const values = {
        products: [
          {},
          {},
        ],
      };
      const sut = mountComponent(values, {}, dummyFn, dummyFn, dummyFn, fakeRemoveProduct);
      const removeBtns = sut.find('button.remove-product');
      expect(removeBtns.length).toBe(2);

      removeBtns.at(1).simulate('click');
      expect(fakeRemoveProduct).toHaveBeenCalledWith('products', 1);
    });

    it.only('calls the changeField of a dynamic field correctly', () => {
      const spy = jest.fn();

      const fakeHandleChange = (name, path = []) => (e) => {
        if (!Array.isArray(path)) {
          throw new Error('path is not an array', path);
        }
        spy([...path, name], e.target.value);
      };

      const values = {
        products: [
          {},
          {},
        ],
      };

      // Mount
      const sut = mountComponent(values, {}, fakeHandleChange);

      // Assert dynamic field
      const productRows = sut.find('div.product-row');
      const qtyField = productRows.at(1).find('input[name="qty"]');
      qtyField.simulate('change', { target: { value: 10 } });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(['products', 1, 'qty'], 10);

      spy.mockReset();

      // User the same fakeHandleChange in a non dynamic field
      const sellerField = sut.find('input[name="seller"]');
      sellerField.simulate('change', { target: { value: 'Company One' } });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(['seller'], 'Company One');
    });
  });
});
