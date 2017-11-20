import reducer, { underscoreIdtoIdField } from './index';
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
    const action = actions.fetchSuccess([
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
    const action = actions.fetchError('Some error');
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
    const action = actions.fetchRequest();
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

describe('underscoreIdtoIdField selector in clients reducer', () => {
  it('can convert a list', () => {
    const userListExample = [
      { _id: '1', name: 'John', phone: '9 8877 7474' },
      { _id: '2', name: 'Mary', phone: '9 8873 3434' },
    ];

    const expected = [
      {
        _id: '1',
        id: '1',
        name: 'John',
        phone: '9 8877 7474',
      },
      {
        _id: '2',
        id: '2',
        name: 'Mary',
        phone: '9 8873 3434',
      },
    ];

    expect(underscoreIdtoIdField(userListExample)).toEqual(expected);
  });

  it('works on lists that does not need convertion', () => {
    const userListExample = [
      { id: '1', name: 'John', phone: '9 8877 7474' },
      { id: '2', name: 'Mary', phone: '9 8873 3434' },
    ];

    expect(underscoreIdtoIdField(userListExample)).toEqual(userListExample);
  });

  it('works when the list is empty', () => {
    expect(underscoreIdtoIdField([])).toEqual([]);
  });
});