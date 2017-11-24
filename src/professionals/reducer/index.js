import * as types from '../actionTypes';

const defaultState = {
  fetchError: undefined,
  addErrors: {},
  fetching: false,
  adding: false,
  list: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        fetchError: undefined,
      };
    case types.FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchError: undefined,
        list: action.payload,
      };
    case types.FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        fetchError: action.error,
      };
    default:
      return state;
  }
};
