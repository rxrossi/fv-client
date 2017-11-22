import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const Add = ({ handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field type="text" name="name" component="input" />
      {
        errors && errors.name === 'NOT_UNIQUE' &&
          <p>A product with this name exists</p>
      }
      {
        errors && errors.name === 'BLANK' &&
          <p>A name is required</p>
      }
    </div>
    <div>
      <Field type="text" name="measure_unit" component="input" />
      {
        errors && errors.measure_unit === 'BLANK' &&
          <p>Measure unit is required</p>
      }
    </div>
    <button type="submit">Register</button>
  </form>
);
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
};
Add.defaultProps = {
  errors: {},
};

export default Add;
