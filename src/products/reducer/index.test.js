import reducer from '../reducer';
import * as actions from '../actions';

describe('Products reducer test', () => {
  it('returns the default state for null actions', () => {
    const expected = {
      fetching: false,
      fetchError: undefined,
      addErrors: {},
      list: [],
    };
    expect(reducer(undefined, {})).toEqual(expected);
  });

  it('actually adds the product on fetchSuccess', () => {
    const productsList = [
      { id: '1', name: 'OX', measure_unit: 'ml' },
      { id: '2', name: 'Shampoo', measure_unit: 'ml' },
      { id: '3', name: 'Capes', measure_unit: 'unit' },
    ];

    const expected = {
      fetching: false,
      fetchError: undefined,
      addErrors: {},
      list: productsList,
    };

    expect(reducer(undefined, actions.fetchSuccess(productsList))).toEqual(expected);
  });
});
