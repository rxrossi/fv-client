import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App from '../../App';
import * as API_URLS from '../../APIInfo';
import FormComponent from '../../purchases/Components/Form';
import ListComponent from '../../purchases/Components/List';
// Configure Enzyme

configure({ adapter: new Adapter() });

const purchase = {
  stockEntries: [
    {
      id: '1', product: { id: '1', name: 'Product 1' }, qty: 2, price: 20,
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
const purchases = [purchase];

const products = [
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

const expectedPostData = {
  products: [
    {
      id: '1', qty: 1, total_price: 10,
    },
    {
      id: '2', qty: 2, total_price: 20,
    },
  ],
  seller: 'Company one',
  date: '10 27 2017',
};

describe('Purchases Page', () => {
  let sut;
  beforeEach((done) => {
    fetchMock.get(API_URLS.PURCHASES, {
      body: {
        statusCode: 200,
        body: purchases,
      },
    });

    fetchMock.get(API_URLS.PRODUCTS, {
      body: {
        statusCode: 200,
        body: products,
      },
    });

    fetchMock.post(
      (url, opts) => (
        url === API_URLS.PURCHASES
          && opts
          && opts.body === JSON.stringify(expectedPostData)
      )
      ,
      {
        body: {
          body: {
            ...expectedPostData,
            products: [
              {
                id: '1', product: { id: '1', name: products[0].name }, qty: 1, price_per_unit: 10,
              },
              {
                id: '2', product: { id: '2', name: products[1].name }, qty: 2, price_per_unit: 10,
              },
            ],
            id: '4',
          },
          statusCode: 201,
        },
      },
      {
        name: 'post_purchases_success',
      },
    );
    sut = mount(<App />);
    sut.find('a[href="/purchases"]').simulate('click', { button: 0 });
    setImmediate(() => done());
  });

  it.only('renders the correct components', () => {
    sut.update();
    const ListMounted = sut.find(ListComponent);
    expect(ListMounted.length).toBe(1);
    expect(ListMounted.props().entities).toEqual(purchases);
    expect(sut.find(FormComponent).length).toBe(1);
  });

  describe('ViewOne of purchases', () => {
    beforeEach((done) => {
      sut.update();
      const viewOneBtn = sut.find(`a[href="purchases/${purchase.id}"]`);
      viewOneBtn.simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    it.only('shows the products', () => {
      sut.update();
      const text = sut.text();
      expect(text).toMatch(purchase.seller);
      expect(text).toMatch(purchase.stockEntries[0].product.name);
      expect(text).toMatch(purchase.stockEntries[0].qty.toString());
    });
  });
});
