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
    case types.ADD_REQUEST:
      return {
        ...state,
        adding: true,
        addErrors: {},
      };
    case types.ADD_SUCCESS:
      return {
        ...state,
        adding: false,
        addErrors: {},
        list: [
          ...state.list,
          action.payload,
        ],
      };
    case types.ADD_ERROR:
      return {
        ...state,
        adding: false,
        addErrors: action.errors,
      };
    case types.CLEAR_ADD_ERROR:
      return {
        ...state,
        adding: false,
        addErrors: {},
      };
    default:
      return state;
  }
};
