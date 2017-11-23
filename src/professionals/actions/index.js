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

export const fetchProfessionals = () => (dispatch) => {
  dispatch(fetchRequest());
  return fetch(API_URLS.PROFESSIONALS)
    .then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        return dispatch(fetchSuccess(json.body));
      }
      return dispatch(fetchError(json.body));
    });
};
