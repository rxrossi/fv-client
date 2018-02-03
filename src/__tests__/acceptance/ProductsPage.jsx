import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App from '../../App';
import * as API_URLS from '../../APIInfo';
import { AddComponent } from '../../products/Containers/Add';
import { ListComponent } from '../../products/Containers/List';
// Configure Enzyme
configure({ adapter: new Adapter() });


describe('Products Page', () => {
  describe('With products', () => {
    let sut;

    const productsList = [
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

    beforeEach((done) => {
      fetchMock.get(API_URLS.PRODUCTS, {
        body: {
          statusCode: 200,
          body: productsList,
        },
      });
      sut = mount(<App />);
      sut.find('a[href="/products"]').simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('loads the correct components', () => {
      sut.update();
      const ListMounted = sut.find(ListComponent);
      expect(ListMounted.length).toBe(1);
      expect(ListMounted.props().entities).toEqual(productsList);
      expect(sut.find(AddComponent).length).toBe(1);
    });
  });

  describe('Going to product detail (View One)', () => {
    const product = {
      id: '1',
      name: 'Something',
      measure_unit: 'unit',
      quantity: 15,
      price_per_unit: 1,
      avgPriceFiveLast: 3,
      stock: [
        {
          qty: -3,
          price: 1,
          id: '5',
          sourceOrDestination: {
            name: 'Client X, to do Y',
            id: '123',
          },
          date: '10 25 2017',
        },
        {
          qty: 10,
          price: 1,
          id: '4',
          sourceOrDestination: {
            seller: 'Company One',
            id: '123',
          },
          date: '10 25 2017',
        },
        {
          qty: 10,
          price: 1,
          id: '3',
          sourceOrDestination: {
            seller: 'Company One',
            id: '123',
          },
          date: '10 24 2017',
        },
        {
          qty: 10,
          price: 1,
          id: '2',
          sourceOrDestination: {
            seller: 'Company One',
            id: '123',
          },
          date: '10 23 2017',
        },
        {
          qty: 10,
          price: 1,
          id: '1',
          sourceOrDestination: {
            seller: 'Company One',
            id: '123',
          },
          date: '10 22 2017',
        },
      ],
    };
    const productsList = [product];

    let sut;
    beforeEach((done) => {
      fetchMock.get(API_URLS.PRODUCTS, {
        body: {
          statusCode: 200,
          body: productsList,
        },
      });

      sut = mount(<App />);

      sut.find('a[href="/products"]').simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    beforeEach((done) => {
      sut.update();
      sut.find(`a[href="/products/${product.id}"]`).simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    it('check if stock renders', () => {
      expect(sut.text()).toMatch(product.stock[0].sourceOrDestination.name);
    });
  });
});
