import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App from '../../App';
import * as API_URLS from '../../APIInfo';
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
      }, // expect total to be 1000 - 150 = 850
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
      }, // expect total to be 2000 - 50 = 1950
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
      }, // expect total to be 100 - 1 = 99
    ],
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
        code: 200,
        body: purchases,
      },
    });

    fetchMock.get(API_URLS.PRODUCTS, {
      body: {
        code: 200,
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
          code: 201,
        },
      },
      {
        name: 'post_purchases',
      },
    );
    sut = mount(<App />);
    sut.find('a[href="/purchases"]').simulate('click', { button: 0 });
    setImmediate(() => done());
  });

  it('renders a form', () => {
    expect(sut.find('form').length).toBe(1);
  });

  describe('The view purchases thing', () => {
    it('Shows the first purchase', () => {
      expect(sut.text()).toMatch(purchase.seller);
    });
  });

  describe('Can go to ViewOne of purchases', () => {
    beforeEach((done) => {
      sut.update();
      const viewOneBtn = sut.find(`a[href="/purchases/${purchase.id}"]`);
      viewOneBtn.simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    it('shows the products', () => {
      const text = sut.text();
      expect(text).toMatch(purchase.seller);
      expect(text).toMatch(purchase.stockEntries[0].product.name);
      expect(text).toMatch(purchase.stockEntries[0].qty.toString());
    });
  });

  describe('Using the form', () => {
    beforeEach((done) => {
      sut.update();
      sut.find('.add-product').simulate('click');
      sut.find('.add-product').simulate('click');
      // Selecting inputs
      const sellerInput = sut.find('input[name="seller"]');
      const dateInput = sut.find('input[name="date"]');

      const groupOfFields = sut.find('form').find('li').at(0);
      const nameSelect = groupOfFields.find('select');
      const qtyInput = groupOfFields.find('input[name="products[0].qty"]');
      const valueInput = groupOfFields.find('input[name="products[0].total_price"]');

      const groupOfFields2 = sut.find('form').find('li').at(1);
      const nameSelect2 = groupOfFields2.find('select');
      const qtyInput2 = groupOfFields2.find('input[name="products[1].qty"]');
      const valueInput2 = groupOfFields2.find('input[name="products[1].total_price"]');

      // Changing values
      // Header
      sellerInput.simulate('change', { target: { value: 'Company one' } });
      dateInput.simulate('change', { target: { value: '10 27 2017' } });

      // First product
      nameSelect.simulate('change', { target: { value: expectedPostData.products[0].id } });
      qtyInput.simulate('change', { target: { value: 1 } });
      valueInput.simulate('change', { target: { value: 10 } });

      // Second product
      nameSelect2.simulate('change', { target: { value: expectedPostData.products[1].id } });
      qtyInput2.simulate('change', { target: { value: 2 } });
      valueInput2.simulate('change', { target: { value: 20 } });

      // Submiting
      sut.find('form').simulate('submit');

      setImmediate(() => done());
    });

    afterEach(() => {
      fetchMock.restore();
      fetchMock.reset();
    });

    it('calls fetchMock on submit', () => {
      const mockPostPurchase = fetchMock.calls('post_purchases');
      expect(mockPostPurchase.length).toBe(1);
    });
  });
});
