import 'isomorphic-fetch'; /* global fetch */
import * as types from '../actionTypes';
import * as API_URLS from '../../APIInfo';

export const fetchRequest = () => ({
  type: types.FETCH_REQUEST,
});

export const fetchSuccess = payload => ({
  type: types.FETCH_SUCCESS,
  payload,
});

export const fetchError = error => ({
  type: types.FETCH_ERROR,
  error,
});

export const fetchPurchases = () => (dispatch) => {
  dispatch(fetchRequest());
  return fetch(API_URLS.PURCHASES)
    .then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        return dispatch(fetchSuccess(json.body));
      }
      return dispatch(fetchError(json.body));
    });
};

export const addRequest = () => ({
  type: types.ADD_REQUEST,
});

export const addSuccess = payload => ({
  type: types.ADD_SUCCESS,
  payload,
});

export const addError = errors => ({
  type: types.ADD_ERROR,
  errors,
});

export const clearAddErrors = () => ({
  type: types.CLEAR_ADD_ERROR,
});

const jsonHeader = {
  'Content-Type': 'application/json',
};

export const addPurchase = data => (dispatch) => {
  dispatch(addRequest());
  return fetch(API_URLS.PURCHASES, { body: JSON.stringify(data), method: 'POST', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 201) {
        return dispatch(addSuccess(json.body));
      }
      return dispatch(addError(json.errors));
    })
    .catch(err => dispatch(addError(err)));
};
