import * as types from '../actionTypes';

const defaultState = {
  fetchError: undefined,
  addErrors: {},
  fetching: false,
  adding: false,
  list: [],
};

/* eslint-disable */
function changeObject(obj, value, path, typeOfOperation) {
  const pathToReduce = Array.isArray(path) ? path : [path];

  pathToReduce.reduce((dir, p, i, arr) => {
    if (i + 1 === arr.length) {
      if (typeOfOperation === 'append_to_arr') {
        return dir[p] = [
          ...dir[p] || [],
          value,
        ]
      } else if (typeOfOperation === 'remove_of_arr') {
        return dir[p] = [
          ...dir[p].slice(0, value),
          ...dir[p].slice(value + 1)
        ]
      }
      return dir[p] = value;
    }
    if (dir[p]) {
      return dir[p];
    }
    return dir[p] = typeof arr[i + 1] === 'number' ? [] : {};
  }, obj);

  return obj;
}
/* eslint-enable */

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.APPEND_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          ...changeObject({ ...state.fields }, action.value, action.path, 'append_to_arr'),
        },
      };
    case types.REMOVE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          ...changeObject({ ...state.fields }, action.index, action.path, 'remove_of_arr'),
        },
      };
    case types.CHANGE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          ...changeObject({ ...state.fields }, action.value, action.path),
        },
      };
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
