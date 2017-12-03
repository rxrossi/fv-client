import reducer from './index';
import * as actions from '../actions';

const professional = {
  id: 'p1',
  name: 'ProOne',
};

const client = {
  id: 'p1',
  name: 'ClientOne',
};

const sale = {
  client,
  name: 'service one',
  value: '300',
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
const sales = [sale];

describe('Sales Reducer', () => {
  const defaultState = {
    fetchError: undefined,
    addErrors: {},
    fetching: false,
    adding: false,
    list: [],
  };

  it('return the expected state for a non matching action', () => {
    const actual = reducer(undefined, {});
    const expected = defaultState;
    expect(actual).toEqual(expected);
  });

  describe('Fetch actions', () => {
    it('returns the expected state for fetchRequest', () => {
      // Act
      const actual = reducer(undefined, actions.fetchRequest());

      // Assert
      const expected = {
        ...defaultState,
        fetching: true,
        fetchError: undefined,
      };
      expect(actual).toEqual(expected);
    });

    it('returns the expected state for fetchSuccess', () => {
      // Prepare
      const previousState = {
        ...defaultState,
        fetching: true,
      };

      // Act
      const actual = reducer(previousState, actions.fetchSuccess(sales));

      // Assert
      const expected = {
        ...defaultState,
        fetching: false,
        list: sales,
      };

      expect(actual).toEqual(expected);
    });

    it('returns the expected state for fetchError', () => {
      // Prepare
      const errorMsg = 'Some error';
      const previousState = {
        ...defaultState,
        fetching: true,
        fetchError: undefined,
      };

      // Act
      const actual = reducer(undefined, actions.fetchError(errorMsg));

      // Assert
      expect(actual).toEqual({
        ...previousState,
        fetching: false,
        fetchError: errorMsg,
      });
    });
  });

  describe('Add actions', () => {
    it('returns the expected state for addRequest', () => {
      // Prepare
      const previousState = {
        ...defaultState,
        adding: false,
        addErrors: {
          name: 'INVALID',
        },
      };

      // Act
      const actual = reducer(previousState, actions.addRequest());

      // Assert
      const expected = {
        ...defaultState,
        adding: true,
        addErrors: {},
      };
      expect(actual).toEqual(expected);
    });

    it('retuns the expected state for addSuccess', () => {
      // Prepare
      const previousState = {
        ...defaultState,
        adding: true,
        addErrors: {
          name: 'INVALID',
        },
        list: [],
      };
      // Act
      const actual = reducer(previousState, actions.addSuccess(sale));

      // Assert
      const expected = {
        ...defaultState,
        adding: false,
        addErrors: {},
        list: [sale],
      };
      expect(actual).toEqual(expected);
    });

    it('returns the expected state for addError', () => {
      // Prepare
      const previousState = {
        ...defaultState,
        adding: true,
        addErrors: {
          name: 'INVALID',
        },
      };

      const errors = {
        name: 'BLANK',
      };

      // Act
      const actual = reducer(previousState, actions.addError(errors));

      // Assert
      const expected = {
        ...previousState,
        adding: false,
        addErrors: errors,
      };
      expect(actual).toEqual(expected);
    });

    it('returns the expected state for clearAddErrors', () => {
      // Prepare
      const previousState = {
        ...defaultState,
        adding: false,
        addErrors: {
          name: 'INVALID',
        },
      };

      // Act
      const actual = reducer(previousState, actions.clearAddErrors());

      // Assert
      const expected = {
        ...previousState,
        adding: false,
        addErrors: {},
      };
      expect(actual).toEqual(expected);
    });
  });
});
