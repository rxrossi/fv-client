import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import View from './View';

// Configure Enzyme
configure({ adapter: new Adapter() });

const baseUrl = '/purchases';

const purchase = {
  products: [
    {
      id: '1', name: 'Product 1', qty: 1, price: 10,
    },
    {
      id: '2', name: 'Product 2', qty: 2, price: 20,
    },
  ],
  seller: 'Company one',
  date: '10 27 2017',
  price: 30,
  id: '1',
};

const purchases = [purchase];

function mountComponent(purchasesList) {
  const App = () => (
    <Router>
      <View purchases={purchasesList || []} baseUrl={baseUrl} />
    </Router>
  );

  return mount(<App />);
}

describe('Purchases View Component', () => {
  it('renders', () => {
    mountComponent();
  });

  describe('No purchases yet', () => {
    it('shows a message saying no purchases yet', () => {
      const sut = mountComponent();
      expect(sut.text()).toMatch('No purchases yet');
    });
  });

  describe('With purchases', () => {
    it('shows the purchases and their products', () => {
      const sut = mountComponent(purchases);
      expect(sut.text()).toMatch(purchase.seller);
      expect(sut.text()).toMatch(purchase.price.toString());
    });

    it('shows a link the view one', () => {
      const sut = mountComponent(purchases);
      const link = sut.find(`a[href="/purchases/${purchase.id}"]`);
      expect(link.length).toBe(1);
    });
  });
});
