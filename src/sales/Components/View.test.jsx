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
    { id: '1', qty: 10 },
    { id: '2', qty: 20 },
  ],
};

const sale2 = {
  id: 's2',
  client,
  name: 'service two',
  value: '320',
  profit: '180',
  payment: 'credit',
  date: '10 11 2017',
  start_time: '12:00',
  end_time: '18:00',
  professional,
  products: [
    { id: '1', qty: 30 },
    { id: '2', qty: 40 },
  ],
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
    expect(text).toMatch(sale1.profit);
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
