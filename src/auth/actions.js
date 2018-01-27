import 'isomorphic-fetch'; /* global fetch */
/* global localStorage */
import * as URLS from '../APIInfo';
import { SET_TOKEN, REMOVE_TOKEN } from './constants';

const setToken = token => ({
  type: SET_TOKEN,
  token,
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

export const register = body => fetch(URLS.USERS, {
  body: JSON.stringify(body),
  method: 'POST',
  headers,
}).then(res => res.json())
  .then((json) => {
    if (json.code === 200) {
      return {
        successMsg: 'User Created',
      };
    }
    if (json.code === 422) {
      return {
        errors: json.errors,
      };
    }
    return {
      errors: {
        general: 'Unexpected error',
      },
    };
  })
  .catch(() => ({
    errors: {
      general: 'Server error',
    },
  }));

export const login = body => dispatch => fetch(URLS.TOKEN, {
  body: JSON.stringify(body),
  method: 'POST',
  headers,
}).then(res => res.json())
  .then((json) => {
    if (json.code === 200) {
      localStorage.setItem('token', json.body);
      dispatch(setToken(json.body));
      return true;
    }

    if (json.code === 401) {
      return {
        errors: {
          general: 'Invalid credentials',
        },
      };
    }

    return {
      errors: {
        general: 'Unexpected error',
      },
    };
  })
  .catch(() => ({
    errors: {
      general: 'Server error',
    },
  }));
