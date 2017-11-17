import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import clients from './clients/reducer';

export default combineReducers({
  clients,
  form: formReducer,
});

