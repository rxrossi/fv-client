import * as types from '../actionTypes';

const defaultState = {
  error: undefined,
  fetching: false,
  list: [],
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS:
      return {
        fetching: false,
        error: undefined,
        list: action.payload,
      };
    case types.FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.err,
      };
    case types.FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }
};
