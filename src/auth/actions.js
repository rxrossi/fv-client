import 'isomorphic-fetch'; /* global fetch */
/* global localStorage */
import * as URLS from '../APIInfo';
import { SET_TOKEN, REMOVE_TOKEN, AUTH_FAILURE } from './constants';

const setToken = token => ({
  type: SET_TOKEN,
  token,
});

const authFailure = (errorMsg = 'Something went wrong') => ({
  type: AUTH_FAILURE,
  errorMsg,
});

const headers = {
  'Content-Type': 'application/json',
};

export const headerCreator = () => ({
  'Content-Type': 'application/json',
  authorization: localStorage.getItem('token'),
});

export const logout = () => {
  localStorage.removeItem('token');
  return ({
    type: REMOVE_TOKEN,
  });
};

export const register = (body) => {
  fetch(URLS.USERS, {
    body: JSON.stringify(body),
    method: 'POST',
    headers,
  }).then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        return true;
      }
      return false;
    });
};

export const login = body => (dispatch) => {
  fetch(URLS.TOKEN, {
    body: JSON.stringify(body),
    method: 'POST',
    headers,
  }).then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        localStorage.setItem('token', json.body);
        return dispatch(setToken(json.body));
      }
      if (json.code === 401) {
        return dispatch(authFailure('Invalid credentials'));
      }
      console.log(json);

      return dispatch(authFailure());
    });
};
