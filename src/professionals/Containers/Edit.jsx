import React from 'react';
import { Redirect } from 'react-router-dom';
import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import Form from '../Components/Form';
import editHOC from '../../HOC/Edit';
import * as urls from '../../APIInfo';
import { headerCreator } from '../../auth/actions';

const { asyncActions, updateFormFieldActions } = reusableReduxConfig(urls.PROFESSIONALS, 'professionals', headerCreator);
const formActions = updateFormFieldActions;

const RedirectComponent = () => <Redirect to="/professionals" />;

const Edit = editHOC(Form, RedirectComponent);

const mapState = state => ({
  errors: state.professionals.APIStatus.put.errors,
  fieldValues: state.professionals.formFields.update,
  entities: state.professionals.entities,
});

const mapDispatch = {
  submit: asyncActions.put,
  fetchEntities: asyncActions.get,
  changeField: formActions.changeField,
  setFields: formActions.set,
  clearFields: formActions.clear,
};

export default connect(mapState, mapDispatch)(Edit);
