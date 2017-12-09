import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { configure, mount } from 'enzyme';
import Add from './Add';
// Configure Enzyme
configure({ adapter: new Adapter() });

const products = [
  {
    id: '1',
    name: 'OX',
    measure_unit: 'ml',
    quantity: 850,
    price: 11.11,
    avgPriceFiveLast: 11.11,
    stock: [
      {
        qty: 1000,
        price: 11.11,
        purchase_id: '12',
      },
      {
        qty: -150,
        price: 11.11,
        use_id: '14',
      },
    ],
  },
  {
    id: '2',
    name: 'Shampoo',
    measure_unit: 'ml',
    quantity: 1950,
    price: 20,
    avgPriceFiveLast: 20,
    stock: [
      {
        qty: 2000,
        price: 20,
        purchase_id: '22',
      },
      {
        qty: -50,
        price: 20,
        use_id: '24',
      },
    ],
  },
  {
    id: '3',
    name: 'Capes',
    measure_unit: 'unit',
    quantity: 99,
    price: 1,
    avgPriceFiveLast: 1,
    stock: [
      {
        qty: 100,
        price: 1,
        purchase_id: '32',
      },
      {
        qty: -1,
        price: 1,
        use_id: '34',
      },
    ],
  },
];

const clients = [
  {
    id: 'c1',
    name: 'Ana',
  },
  {
    id: 'c2',
    name: 'Mary',
  },
];

const professionals = [
  {
    id: 'p1',
    name: 'ProOne',
  },
  {
    id: 'p2',
    name: 'ProTwo',
  },
];

const paymentOptions = [
  'Money',
  'Debit',
  'Credit 1x',
  'Credit 2x',
  'Credit 3x',
];

const expectedPostData = {
  client: clients[0].id,
  name: 'service one',
  value: '300',
  payment_method: 'money',
  date: '10 10 2017',
  start_time: '10:00',
  end_time: '16:00',
  professional: professionals[0].id,
  products: [
    { id: '1', qty: 10 },
    { id: '2', qty: 20 },
  ],
};

function mountComponent(submitFn = () => {}) {
  const reducer = combineReducers({
    form: formReducer,
  });
  const store = createStore(reducer);

  const App = () => (
    <Provider store={store}>
      <Add
        onSubmit={submitFn}
        paymentOptions={paymentOptions}
        clients={clients}
        professionals={professionals}
        productsForSelect={products}
      />
    </Provider>
  );

  const sut = mount(<App />);

  const inpts = {};
  inpts.name = sut.find('input[name="name"]');
  inpts.client = sut.find('select[name="client"]');
  inpts.professional = sut.find('select[name="professional"]');
  inpts.payment_method = sut.find('select[name="payment_method"]');
  inpts.value = sut.find('input[name="value"]');
  inpts.date = sut.find('input[name="date"]');
  inpts.startTime = sut.find('input[name="start_time"]');
  inpts.endTime = sut.find('input[name="end_time"]');

  return {
    sut,
    inpts,
  };
}

function changeInpt(inpt, value) {
  inpt.simulate('change', { target: { value } });
}

describe('Sales Add Component', () => {
  it('mounts', () => {
    mountComponent();
  });

  it('has a submit button', () => {
    const { sut } = mountComponent();
    expect(sut.find('button[type="submit"]').length).toBe(1);
  });

  it('Filling and submiting', () => {
    // Prepare
    const fakeSubmit = jest.fn();
    const { sut, inpts } = mountComponent(fakeSubmit);

    const addProductBtn = sut.find('button[name="add-product"]');
    expect(addProductBtn.length).toBe(1);

    // fill the form
    // regular inputs
    changeInpt(inpts.name, expectedPostData.name);
    changeInpt(inpts.value, expectedPostData.value);
    changeInpt(inpts.payment_method, expectedPostData.payment_method);
    changeInpt(inpts.date, expectedPostData.date);
    changeInpt(inpts.startTime, expectedPostData.start_time);
    changeInpt(inpts.endTime, expectedPostData.end_time);
    changeInpt(inpts.client, expectedPostData.client);
    changeInpt(inpts.professional, expectedPostData.professional);

    // products fields
    addProductBtn.simulate('click');
    addProductBtn.simulate('click');

    const groupOfFields = sut.find('li').at(0);
    const nameSelect = groupOfFields.find('select');
    const qtyInput = groupOfFields.find('input[name="products[0].qty"]');

    const groupOfFields2 = sut.find('li').at(1);
    const nameSelect2 = groupOfFields2.find('select');
    const qtyInput2 = groupOfFields2.find('input[name="products[1].qty"]');

    // First product
    changeInpt(nameSelect, expectedPostData.products[0].id);
    changeInpt(qtyInput, expectedPostData.products[0].qty);

    // Second product
    changeInpt(nameSelect2, expectedPostData.products[1].id);
    changeInpt(qtyInput2, expectedPostData.products[1].qty);

    // Act
    sut.simulate('submit');

    // Assert
    expect(fakeSubmit.mock.calls.length).toBe(1);
    const submitValues = fakeSubmit.mock.calls[0][0];
    expect(submitValues).toEqual(expectedPostData);
  });
});
