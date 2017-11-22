import * as types from '../actionTypes';

const defaultState = {
  fetchError: undefined,
  addErrors: {},
  fetching: false,
  list: [],
};

export const underscoreIdtoIdField = list => list.map((item) => {
  /* eslint-disable */
  if (item._id && !item.id) {
    return {
      ...item,
      id: item._id,
    };
  }
 /* eslint-enable */
  return item;
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
    case types.ADD_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchError: undefined,
        list: [
          ...state.list,
          ...underscoreIdtoIdField([action.payload]),
        ],
      };
    default:
      return state;
  }
};
