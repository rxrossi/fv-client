import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const Add = ({ handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field type="text" name="name" component="input" />
      {
        errors && errors.name === 'NOT_UNIQUE' &&
          <p>A client with this name already exists</p>
      }
    </div>
    <div>
      <Field type="text" name="measure_unit" component="input" />
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
