import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import EditHOC from '../../HOC/Edit';

const RedirectComponent = () => <Redirect to="/products" />;

const Edit = EditHOC(Form, RedirectComponent);

const { asyncActions, updateFormFieldActions } = reusableReduxConfig(urls.SALES, 'sales');
const formActions = updateFormFieldActions;

const mapDispatch = {
  submit: asyncActions.put,
  fetchEntities: asyncActions.get,
  changeField: formActions.changeField,
  setFields: formActions.set,
  clearFields: formActions.clear,
};

const mapState = state => ({
  errors: state.products.APIStatus.put.errors,
  fieldValues: state.products.formFields.update,
  entities: state.products.entities,
});

export { Edit };

export default connect(mapState, mapDispatch)(Edit);
