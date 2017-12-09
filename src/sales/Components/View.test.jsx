import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import View from './View';
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

const sale1 = {
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
    { id: '1', qty: 10, product: { name: 'OX' } },
    { id: '2', qty: 20, product: { name: 'Shampoo' } },
  ],
  profit: 200,
};

const sale2 = {
  id: 's2',
  name: 'service two',
  client,
  professional,
  date: '11 11 2018',
  start_time: '11:00',
  end_time: '15:00',
  payment: {
    value_total: 200,
    value_liquid: 180,
    discount: '10%',
    method: 'Credit 3x',
    available_at: Date.now(),
  },
  stockEntries: [
    { id: '1', qty: 30, product: { name: 'OX' } },
    { id: '2', qty: 60, product: { name: 'Shampoo' } },
  ],
  profit: 100,
};

const sales = [sale1, sale2];

describe('View Component', () => {
  it('shows the no warning message', () => {
    const App = () => (
      <Router>
        <View />
      </Router>
    );
    const sut = mount(<App />);
    expect(sut.text()).toMatch('No sales registered yet');
  });

  it('shows the sales if they are passed', () => {
    // Prepare
    const App = () => (
      <Router>
        <View sales={sales} />
      </Router>
    );
    const sut = mount(<App />);
    const text = sut.text();

    // Assert
    expect(text).toMatch(sale1.client.name);
    expect(text).toMatch(sale1.name);
    expect(text).toMatch(sale1.profit.toString());
  });

  it('has a link to the first sale', () => {
    // Prepare
    const App = () => (
      <Router>
        <View sales={sales} />
      </Router>
    );
    const sut = mount(<App />);
    const firstProductLink = sut.find(`a[href="/sales/${sale1.id}"]`);
    expect(firstProductLink.length).toBe(1);
  });
});
