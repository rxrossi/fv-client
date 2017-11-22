import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App, { store } from '../../App';
import * as API_URLS from '../../APIInfo';
import { NO_PRODUCTS_P_CLASS } from '../../products/Components/View';
// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Products Page', () => {
  describe('No products yet', () => {
    let sut;

    beforeEach((done) => {
      fetchMock.get(API_URLS.PRODUCTS, {
        body: {
          code: 200,
          body: [],
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

    it('has a form', () => {
      const form = sut.find('form');
      expect(form.length).toBe(1);
    });

    it('displays the no products warning', () => {
      expect(sut.find(`.${NO_PRODUCTS_P_CLASS}`).length).toBe(1);
    });
  });
  describe('With products', () => {
    let sut;

    const productsList = [
      { id: '1', name: 'OX', measure_unit: 'ml' },
      { id: '2', name: 'Shampoo', measure_unit: 'ml' },
      { id: '3', name: 'Capes', measure_unit: 'unit' },
    ];

    beforeEach((done) => {
      fetchMock.get(API_URLS.PRODUCTS, {
        body: {
          code: 200,
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

    it('has the products in the store', () => {
      const actual = store.getState().products.list;
      expect(actual).toEqual(productsList);
    });

    it('lists the products', () => {
      expect(sut.text()).toMatch(productsList[0].name);
    });
  });
  describe('Form submit success case', () => {
    let sut;

    const productExample = {
      name: 'NEW PROD',
      measure_unit: 'ml',
    };

    beforeAll(async (done) => {
      fetchMock
        .restore()
        .reset()
        .get(API_URLS.PRODUCTS, {
          code: 200,
          body: [],
        });

      fetchMock.post(
        (url, opts) =>
          url === API_URLS.PRODUCTS
          && opts
          && opts.body === JSON.stringify(productExample)
        ,
        {
          body: {
            body: {
              ...productExample,
              id: '4',
            },
            code: 201,
          },
        },
      );

      // Go to Clients page
      sut = await mount(<App />);
      sut.find('a[href="/products"]').simulate('click', { button: 0 });

      await setImmediate(() =>
        Promise.resolve());

      // Fill up form and submit
      sut.find('input[name="name"]')
        .simulate('change', { target: { value: productExample.name } });
      sut.find('input[name="measure_unit"]')
        .simulate('change', { target: { value: productExample.measure_unit } });

      sut.find('form').simulate('submit');

      await setImmediate(() => done());
    });

    afterAll(() => {
      fetchMock.restore();
      fetchMock.reset();
    });

    it('has a name and measure unit field', () => {
      const nameInpt = sut.find('input[name="name"]');
      const phoneInpt = sut.find('input[name="measure_unit"]');
      const submitBtn = sut.find('button[type="submit"]');

      expect(nameInpt.length).toBe(1);
      expect(phoneInpt.length).toBe(1);
      expect(submitBtn.length).toBe(1);
    });

    it('calls the API with expected data on submit', () => {
      expect(fetchMock.calls().matched.length).toBe(2);
    });

    it('clears the field on submit', () => {
      expect(sut.find('input[name="name"]').props().value).toEqual('');
      expect(sut.find('input[name="measure_unit"]').props().value).toEqual('');
    });

    it('shows the recently added product', () => {
      expect(sut.text()).toMatch(productExample.name);
    });
  });
});
