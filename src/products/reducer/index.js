import * as types from '../actionTypes';

const defaultState = {
  fetchError: undefined,
  fields: {},
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
        addErrors: {},
        fields: {},
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
    case types.CLEAR_ADD_FORM:
      return {
        ...state,
        addErrors: {},
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
