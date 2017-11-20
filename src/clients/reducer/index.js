import * as types from '../actionTypes';

const defaultState = {
  error: undefined,
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
        fetching: false,
        error: undefined,
        list: underscoreIdtoIdField(action.payload),
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
