import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import ViewOne from './ViewOne';
// Configure Enzyme
configure({ adapter: new Adapter() });

const product = {
  id: '1',
  name: 'Something',
  measure_unit: 'unit',
  quantity: 15,
  price: 1,
  avgPriceFiveLast: 3,
  stock: [
    {
      qty: -3,
      price: 1,
      id: '5',
      sourceOrDestination: 'Client X, to do Y',
      date: '10 25 2017',
    },
    {
      qty: 10,
      price: 1,
      id: '4',
      sourceOrDestination: 'Company two',
      date: '10 25 2017',
    },
    {
      qty: 10,
      price: 1,
      id: '3',
      sourceOrDestination: 'Company one',
      date: '10 24 2017',
    },
    {
      qty: 10,
      price: 1,
      id: '2',
      sourceOrDestination: 'Company two',
      date: '10 23 2017',
    },
    {
      qty: 10,
      price: 1,
      id: '1',
      sourceOrDestination: 'Company one',
      date: '10 22 2017',
    },
  ],
};

describe('Products ViewOne Component', () => {
  it('renders', () => {
    mount(<ViewOne product={product} />);
  });

  it('shows the product name', () => {
    const sut = mount(<ViewOne product={product} />);
    const text = sut.text();

    expect(text).toMatch(product.name);
    expect(text).toMatch(product.stock[0].sourceOrDestination);
    expect(text).toMatch(product.stock[0].date);
  });

  it('shows a message saying that there is no entry if necessary', () => {
    const productWithoutEntries = {
      id: '1',
      name: 'Something',
      measure_unit: 'unit',
      stock: [],
    };

    const sut = mount(<ViewOne product={productWithoutEntries} />);
    const text = sut.text();

    expect(text).toMatch('No entries for this product yet');
  });
});
