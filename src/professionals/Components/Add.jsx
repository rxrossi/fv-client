import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const Add = ({ handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field type="text" component="input" name="name" />
      {
        errors && errors.name === 'NOT_UNIQUE' &&
          'A professional with this name already exists'
      }
      {
        errors && errors.name === 'BLANK' &&
          'A name is required'
      }
    </div>
    <button type="submit">Register</button>
  </form>
);

Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default reduxForm({
  form: 'professionals',
})(Add);
