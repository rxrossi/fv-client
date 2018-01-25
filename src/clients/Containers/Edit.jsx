import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import EditHOC from '../../HOC/Edit';
import { headerCreator } from '../../auth/actions';

const RedirectComponent = () => <Redirect to="/clients" />;

const Edit = EditHOC(Form, RedirectComponent);

const { asyncActions, updateFormFieldActions } = reusableReduxConfig(urls.CLIENTS, 'clients', headerCreator);
const formActions = updateFormFieldActions;

const mapDispatch = {
  submit: asyncActions.put,
  fetchEntities: asyncActions.get,
  changeField: formActions.changeField,
  setFields: formActions.set,
  clearFields: formActions.clear,
};

const mapState = state => ({
  errors: state.clients.APIStatus.put.errors,
  fieldValues: state.clients.formFields.update,
  entities: state.clients.entities,
});

export { Edit };

export default connect(mapState, mapDispatch)(Edit);
