import reducer from './index';
import * as actions from '../actions';

describe('Professionals Reduce', () => {
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
      const professionalsListExample = [
        { id: '1', name: 'Mary' },
        { id: '2', name: 'Carl' },
      ];
      const previousState = {
        ...defaultState,
        fetching: true,
      };

      // Act
      const actual = reducer(previousState, actions.fetchSuccess(professionalsListExample));

      // Assert
      const expected = {
        ...defaultState,
        fetching: false,
        list: professionalsListExample,
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
      const actual = reducer(undefined, actions.addRequest());

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
      const carl = {
        id: '10',
        name: 'Carl',
      };
      const previousState = {
        ...defaultState,
        adding: true,
        addErrors: {
          name: 'INVALID',
        },
        list: [],
      };
      // Act
      const actual = reducer(previousState, actions.addSuccess(carl));

      // Assert
      const expected = {
        ...defaultState,
        adding: false,
        addErrors: {},
        list: [carl],
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
  });
});
