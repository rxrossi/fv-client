import * as types from '../actionTypes';

const defaultState = {
  fetchError: undefined,
  addErrors: {},
  fields: {},
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
        fields: {},
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
    case types.CLEAR_ADD_FORM:
      return {
        ...state,
        addErrors: {},
        fields: {},
      };
    case types.CHANGE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: action.value,
        },
      };
    default:
      return state;
  }
};
