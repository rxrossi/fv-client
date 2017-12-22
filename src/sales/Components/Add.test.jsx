import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
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

function mountComponent() {
  const App = () => (
    <Add
      clients={clients}
      productsForSelect={products}
      professionals={professionals}
      handleChange={() => {}}
      handleSubmit={() => {}}
      paymentOptions={paymentOptions}
      values={{}}
      errors={{}}
      addField={() => {}}
      removeField={() => {}}
    />
  );
  return mount(<App />);
}

describe('Sales Add Component', () => {
  it('mounts', () => {
    mountComponent();
  });

  it('has a submit button', () => {
    const sut = mountComponent();
    expect(sut.find('button[type="submit"]').length).toBe(1);
  });
});
