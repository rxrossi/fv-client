import * as types from '../actionTypes';

const defaultState = {
  fetchError: undefined,
  addErrors: {},
  fetching: false,
  list: [],
};

/* eslint-disable */
export const underscoreIdtoIdField = list => list.map((client) => {
  if (client._id && !client.id) {
    return {
      ...client,
      id: client._id,
    };
  }
 /* eslint-enable */
  return client;
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchError: undefined,
        list: underscoreIdtoIdField(action.payload),
      };
    case types.FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        fetchError: action.err,
      };
    case types.FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case types.ADD_SUCCESS:
      return {
        ...state,
        addErrors: {},
        list: [
          ...state.list,
          ...underscoreIdtoIdField([action.payload]),
        ],
      };
    case types.ADD_ERROR:
      return {
        ...state,
        addErrors: action.errors,
      };
    case types.ADD_CLEAR_ERRORS:
      return {
        ...state,
        addErrors: {},
      };
    default:
      return state;
  }
};
