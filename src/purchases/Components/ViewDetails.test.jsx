import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import ViewOne from './ViewOne';

// Configure Enzyme
configure({ adapter: new Adapter() });

const purchase = {
  stockEntries: [
    {
      id: '1', product: { id: '1', name: 'Product 1' }, qty: 1, price: 10,
    },
    {
      id: '2', product: { id: '2', name: 'Product 2' }, qty: 2, price: 20,
    },
  ],
  seller: 'Company one',
  date: '10 27 2017',
  id: '1',
  price: '90',
};

describe('Purchases View One', () => {
  it('shows a warning in case the purchase does not exist', () => {
    const sut = mount(<ViewOne />);
    const msg = 'Could not find this purchase';
    expect(sut.text()).toMatch(msg);
  });

  it('shows the purchase title if one is passed', () => {
    const sut = mount(<ViewOne purchase={purchase} />);
    expect(sut.text()).toMatch(purchase.seller);
  });

  it('shows the products if one is passed', () => {
    const sut = mount(<ViewOne purchase={purchase} />);
    expect(sut.text()).toMatch(purchase.stockEntries[0].product.name);
  });
});
