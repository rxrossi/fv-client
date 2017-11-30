import 'isomorphic-fetch'; /* global fetch */
import * as types from '../actionTypes';
import * as urls from '../../APIInfo';

const jsonHeader = {
  'Content-Type': 'application/json',
};

export const addRequest = () => ({
  type: types.ADD_REQUEST,
});

export const addError = errorObject => ({
  type: types.ADD_ERROR,
  errors: errorObject,
});

export const addSuccess = payload => ({
  type: types.ADD_SUCCESS,
  payload,
});

export const clearAddErrors = () => ({
  type: types.ADD_CLEAR_ERRORS,
});

export const addProduct = data => (dispatch) => {
  dispatch(addRequest());
  return fetch(urls.PRODUCTS, { body: JSON.stringify(data), method: 'POST', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 201) {
        return dispatch(addSuccess(json.body));
      }
      return dispatch(addError(json.errors));
    })
    .catch(err => dispatch(addError(err)));
};
export const fetchRequest = () => ({
  type: types.FETCH_REQUEST,
});

export const fetchError = err => ({
  type: types.FETCH_ERROR,
  err,
});

export const fetchSuccess = payload => ({
  type: types.FETCH_SUCCESS,
  payload,
});
export const fetchProducts = () => (dispatch) => {
  dispatch(fetchRequest());
  return fetch(urls.PRODUCTS)
    .then(res => res.json())
    .then(json => dispatch(fetchSuccess(json.body)))
    .catch(err => dispatch(fetchError(err)));
};