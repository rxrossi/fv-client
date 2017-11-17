import 'isomorphic-fetch'; /* global fetch */
import * as types from '../actionTypes';
import * as urls from '../../APIInfo';

export const request = () => ({
  type: types.FETCH_REQUEST,
});

export const error = err => ({
  type: types.FETCH_ERROR,
  err,
});

export const success = payload => ({
  type: types.FETCH_SUCCESS,
  payload,
});


export const fetchClients = () => (dispatch) => {
  dispatch(request());
  return fetch(urls.CLIENTS)
    .then(res => res.json())
    .then(json => dispatch(success(json)))
    .catch(err => dispatch(error(err)));
};
