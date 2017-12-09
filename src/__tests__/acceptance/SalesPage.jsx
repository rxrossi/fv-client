import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App from '../../App';
import * as API_URLS from '../../APIInfo';
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

const expectedPostData = {
  client: clients[0].id,
  name: 'service one',
  value: '300',
  payment: 'money',
  date: '10 10 2017',
  start_time: '10:00',
  end_time: '16:00',
  professional: professionals[0].id,
  products: [
    { id: '1', qty: 10 },
    { id: '2', qty: 20 },
  ],
};

const sale1 = {
  id: 's1',
  name: 'service one',
  client: clients[0],
  professional: professionals[0],
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
  client: clients[0],
  professional: professionals[0],
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

describe('Sales page', () => {
  let sut;
  beforeEach((done) => {
    fetchMock.get(API_URLS.SALES, {
      body: {
        code: 200,
        body: [],
      },
    });

    fetchMock.get(API_URLS.PRODUCTS, {
      body: {
        code: 200,
        body: products,
      },
    });

    fetchMock.get(API_URLS.PROFESSIONALS, {
      body: {
        code: 200,
        body: professionals,
      },
    });

    fetchMock.get(API_URLS.CLIENTS, {
      body: {
        code: 200,
        body: clients,
      },
    });

    fetchMock.post(
      (url, opts) => (
        url === API_URLS.SALES
        && opts
      )
      ,
      {
        body: {
          body: {
            ...expectedPostData,
            client: clients[0],
            professional: professionals[0],
            products: [
              {
                id: '1', product: { id: '1', name: products[0].name }, qty: 1, price: 10,
              },
              {
                id: '2', product: { id: '2', name: products[1].name }, qty: 2, price: 20,
              },
            ],
            id: '4',
          },
          code: 201,
        },
      },
      {
        name: 'post_sales',
      },
    );
    sut = mount(<App />);
    sut.find('a[href="/sales"]').simulate('click', { button: 0 });
    setImmediate(() => done());
  });

  it('renders a form', () => {
    expect(sut.find('form').length).toBe(1);
  });

  describe('No sales yet', () => {
    it('shows a message saying that there are no sales yet', () => {
      expect(sut.text()).toMatch('No sales registered yet');
    });
  });

  describe('With sales to show', () => {
    beforeEach((done) => {
      fetchMock
        .restore()
        .get(API_URLS.SALES, {
          body: {
            code: 200,
            body: sales,
          },
        });

      fetchMock.get(API_URLS.PRODUCTS, {
        body: {
          code: 200,
          body: products,
        },
      });

      fetchMock.get(API_URLS.PROFESSIONALS, {
        body: {
          code: 200,
          body: professionals,
        },
      });

      fetchMock.get(API_URLS.CLIENTS, {
        body: {
          code: 200,
          body: clients,
        },
      });
      sut = mount(<App />);
      sut.find('a[href="/sales"]').simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    it('shows the sales', () => {
      const text = sut.text();
      expect(text).toMatch(sale1.name);
    });
  });

  describe('Can go to ViewOne of sales', () => {
    beforeEach((done) => {
      fetchMock
        .reset()
        .restore()
        .get(API_URLS.SALES, {
          body: {
            code: 200,
            body: sales,
          },
        });

      fetchMock.get(API_URLS.PRODUCTS, {
        body: {
          code: 200,
          body: products,
        },
      });

      fetchMock.get(API_URLS.PROFESSIONALS, {
        body: {
          code: 200,
          body: professionals,
        },
      });

      fetchMock.get(API_URLS.CLIENTS, {
        body: {
          code: 200,
          body: clients,
        },
      });

      sut = mount(<App />);
      sut.find('a[href="/sales"]').simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    beforeEach((done) => {
      sut.update();
      const firstSaleLink = sut.find(`a[href="/sales/${sale1.id}"]`);
      firstSaleLink.simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    it('shows the products', () => {
      expect(sut.text()).toMatch(sale1.stockEntries[0].product.name);
    });
  });

  describe('Using the form', () => {
    beforeEach((done) => {
      sut.update();
      sut.find('form').simulate('submit');
      setImmediate(() => done());
    });

    it('calls fetchMock on submit', () => {
      const mockPostPurchase = fetchMock.calls('post_sales');
      expect(mockPostPurchase.length).toBe(1);
    });
  });

  afterEach(() => {
    fetchMock.restore();
    fetchMock.reset();
  });
});
