import reducer from './index';
import * as actions from '../actions';

describe('Clients reducer', () => {
  const userListExample = [
    { name: 'John', phone: '9 8877 7474' },
    { name: 'Mary', phone: '9 8873 3434' },
  ];

  it('empty action returns default state', () => {
    const actual = reducer(undefined, {});
    const expected = {
      fetching: false,
      error: undefined,
      list: [],
    };
    expect(actual).toEqual(expected);
  });

  it('add a new client upon receiving the client list', () => {
    const action = actions.success([
      { name: 'John', phone: '9 8877 7474' },
      { name: 'Mary', phone: '9 8873 3434' },
    ]);

    const actual = reducer(undefined, action);

    const expected = {
      fetching: false,
      error: undefined,
      list: [...action.payload],
    };

    expect(actual).toEqual(expected);
  });

  it('returns the correct state when receives an error', () => {
    const action = actions.error('Some error');
    const expected = {
      fetching: false,
      error: 'Some error',
      list: userListExample,
    };

    const actual = reducer({
      fetching: true,
      error: undefined,
      list: userListExample,
    }, action);

    expect(actual).toEqual(expected);
  });

  it('retuns the correct state when requesting', () => {
    const action = actions.request();
    const previousState = {
      error: 'Some Error',
      fetching: false,
      list: userListExample,
    };
    const expectedState = {
      error: 'Some Error',
      fetching: true,
      list: userListExample,
    };

    const actual = reducer(previousState, action);

    expect(actual).toEqual(expectedState);
  });
});
