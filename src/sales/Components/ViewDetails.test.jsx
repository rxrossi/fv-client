import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewOne from './ViewOne';
// Configure Enzyme
configure({ adapter: new Adapter() });

const professional = {
  id: 'p1',
  name: 'ProOne',
};

const client = {
  id: 'p1',
  name: 'ClientOne',
};

const sale = {
  id: 's1',
  name: 'service one',
  client,
  professional,
  date: '10 10 2017',
  start_time: '10:00',
  end_time: '16:00',
  payment: {
    value_total: 300,
    value_liquid: 300,
    discount: 'none',
    method: 'money',
    available_at: Date.now(),
  },
  stockEntries: [
    {
      id: '1', qty: 10, product: { name: 'OX' }, price_per_unit: 0.15,
    },
    {
      id: '2', qty: 20, product: { name: 'Shampoo' }, price_per_unit: 0.25,
    },
  ],
  profit: 200,
};

describe('ViewOne Component', () => {
  it.only('shows the no warning message', () => {
    const App = () => (
      <Router>
        <ViewOne />
      </Router>
    );
    const sut = mount(<App />);
    expect(sut.text()).toMatch('The sale could not be found');
  });

  it.only('shows the sales if they are passed', () => {
    // Prepare
    const App = () => (
      <Router>
        <ViewOne sale={sale} />
      </Router>
    );
    const sut = mount(<App />);
    const text = sut.text();

    // Assert
    expect(text).toMatch(sale.client.name);
    expect(text).toMatch(sale.stockEntries[0].product.name);
    expect(text).toMatch(sale.name);
    expect(text).toMatch(sale.profit.toString());
    expect(text).toMatch(sale.stockEntries[0].qty.toString());

    const costOfProductOne = sale.stockEntries[0].qty * sale.stockEntries[0].price_per_unit;
    expect(text).toMatch(costOfProductOne.toString());
    // expect(text).toMatch(sale.stockEntries[0].price.toString());
    // expect(text).toMatch(sale.stockEntries[1].price.toString());
  });
});
