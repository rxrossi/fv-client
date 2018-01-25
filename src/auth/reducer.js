import { SET_TOKEN, REMOVE_TOKEN, AUTH_FAILURE } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.token,
      };
    case REMOVE_TOKEN:
      return {};
    case AUTH_FAILURE:
      return {
        ...state,
        errorMsg: 'some error',
      };
    default:
      return state;
  }
};
