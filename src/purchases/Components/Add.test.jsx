import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

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

describe('Purchases Add component', () => {
  it('renders', () => {
    const reducer = combineReducers({
      form: formReducer,
    });
    const store = createStore(reducer);
    const App = () => (
      <Provider store={store}>
        <Add />
      </Provider>
    );
    const sut = mount(<App />);

    expect(sut.length).toBe(1);
  });

  describe('Handling dinamic fields', () => {
    let sut;
    beforeEach(() => {
      const reducer = combineReducers({
        form: formReducer,
      });
      const store = createStore(reducer);
      const App = () => (
        <Provider store={store}>
          <Add />
        </Provider>
      );
      sut = mount(<App />);
    });

    it('has a button', () => {
      const addBtn = sut.find('.add-product');
      expect(addBtn.length).toBe(1);
    });

    it('can add a new set of product fields', () => {
      const removeClass = '.remove-product';
      // Check amount of remove buttons
      expect(sut.find(removeClass).length).toBe(0);

      // Add one
      sut.find('.add-product').simulate('click');

      // Check amount of remove buttons
      expect(sut.find(removeClass).length).toBe(1);
    });
  });

  describe('Using submit with the correct values', () => {
    let sut;
    const jestSubmit = jest.fn();

    beforeEach(() => {
      const reducer = combineReducers({
        form: formReducer,
      });
      const store = createStore(reducer);

      class AddContainer extends React.Component {
        // eslint-disable-next-line
        submit(values) {
          jestSubmit(values);
        }
        render() {
          return <Add productsForSelect={productsList} onSubmit={this.submit} />;
        }
      }

      const App = () => (
        <Provider store={store}>
          <AddContainer />
        </Provider>
      );
      sut = mount(<App />);

      // Add two sets of fields
      sut.find('.add-product').simulate('click');
      sut.find('.add-product').simulate('click');
    });

    it('calls the submit with expected values', () => {
      // Selecting inputs
      const sellerInput = sut.find('input[name="seller"]');
      const dateInput = sut.find('input[name="date"]');

      const groupOfFields = sut.find('li').at(0);
      const nameSelect = groupOfFields.find('select');
      const qtyInput = groupOfFields.find('input[name="products[0].qty"]');
      const valueInput = groupOfFields.find('input[name="products[0].price"]');

      const groupOfFields2 = sut.find('li').at(1);
      const nameSelect2 = groupOfFields2.find('select');
      const qtyInput2 = groupOfFields2.find('input[name="products[1].qty"]');
      const valueInput2 = groupOfFields2.find('input[name="products[1].price"]');

      // Changing values
      // Header
      sellerInput.simulate('change', { target: { value: 'Company one' } });
      dateInput.simulate('change', { target: { value: '10 27 2017' } });

      // First product
      nameSelect.simulate('change', { target: { value: productsList[0].id } });
      qtyInput.simulate('change', { target: { value: 1 } });
      valueInput.simulate('change', { target: { value: 10 } });

      // Second product
      nameSelect2.simulate('change', { target: { value: productsList[1].id } });
      qtyInput2.simulate('change', { target: { value: 2 } });
      valueInput2.simulate('change', { target: { value: 20 } });

      // Submiting
      sut.find('form').simulate('submit');

      // Asserting submit values
      const expected = {
        date: '10 27 2017',
        seller: 'Company one',
        products: [
          { id: '1', qty: 1, price: 10 },
          { id: '2', qty: 2, price: 20 },
        ],
      };
      expect(jestSubmit).toHaveBeenCalledWith(expected);
    });
  });
});
