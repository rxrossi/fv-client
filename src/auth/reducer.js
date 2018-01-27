import { SET_TOKEN, REMOVE_TOKEN } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.token,
      };
    case REMOVE_TOKEN:
      return {};
    default:
      return state;
  }
};
