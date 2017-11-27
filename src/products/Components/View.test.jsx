import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import View from './View';
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

describe('Products Component', () => {
  it('Shows the products', () => {
    /* eslint-disable */
    const sut = mount(
      <Router>
        <View products={productsList} baseUrl={'/products'} />
      </Router>);
    /* eslint-enable */
    const text = sut.text();
    expect(text).toMatch(productsList[0].name);

    expect(text).toMatch(productsList[0].quantity.toString());
    expect(text).toMatch(productsList[0].avgPriceFiveLast.toString());
  });
});
