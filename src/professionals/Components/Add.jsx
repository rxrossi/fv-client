import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const Add = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field type="text" component="input" name="name" />
    <button type="submit">Register</button>
  </form>
);
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'professionals',
})(Add);
