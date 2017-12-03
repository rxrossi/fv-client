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
  client,
  name: 'service one',
  value: '300',
  profit: '180',
  payment: 'money',
  date: '10 10 2017',
  start_time: '10:00',
  end_time: '16:00',
  professional,
  products: [
    {
      id: '1', name: 'OX', qty: 10, price: 100,
    },
    {
      id: '2', name: 'Shampoo', qty: 20, price: 150,
    },
  ],
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
    expect(text).toMatch(sale.name);
    expect(text).toMatch(sale.profit);
    expect(text).toMatch(sale.products[0].qty.toString());
    expect(text).toMatch(sale.products[0].price.toString());
    expect(text).toMatch(sale.products[1].price.toString());
  });
});
