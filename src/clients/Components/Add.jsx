import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const Add = ({ handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name="name" component="input" type="text" />
      {
        errors && errors.name === 'NOT_UNIQUE' &&
          <p>A client with this name already exists</p>
      }
    </div>
    <div>
      <Field name="phone" component="input" type="text" />
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
