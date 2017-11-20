import 'isomorphic-fetch'; /* global fetch */
import * as types from '../actionTypes';
import * as urls from '../../APIInfo';

const jsonHeader = {
  'Content-Type': 'application/json',
};

export const addRequest = () => ({
  type: types.ADD_REQUEST,
});

export const addError = () => ({
  type: types.ADD_ERROR,
});

export const addSuccess = payload => ({
  type: types.ADD_SUCCESS,
  payload,
});

export const addClient = data => (dispatch) => {
  dispatch(addRequest());
  return fetch(urls.CLIENTS, { body: JSON.stringify(data), method: 'POST', headers: jsonHeader })
    .then(res => res.json())
    .then(json => dispatch(addSuccess(json)))
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


export const fetchClients = () => (dispatch) => {
  dispatch(fetchRequest());
  return fetch(urls.CLIENTS)
    .then(res => res.json())
    .then(json => dispatch(fetchSuccess(json)))
    .catch(err => dispatch(fetchError(err)));
};
