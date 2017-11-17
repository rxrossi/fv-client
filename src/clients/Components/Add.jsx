import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const Add = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field name="name" component="input" type="text" />
    <Field name="phone" component="input" type="text" />
    <button type="submit">Register</button>
  </form>
);
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Add;
