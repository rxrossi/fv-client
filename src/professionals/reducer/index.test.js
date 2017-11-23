import reducer from './index';

describe('Professionals Reduce', () => {
  it('return the expected state for a non matching action', () => {
    const actual = reducer(undefined, {});
    const expected = {
      fetchError: undefined,
      addErrors: {},
      fetching: false,
      adding: false,
      list: [],
    };
    expect(actual).toEqual(expected);
  });
});
