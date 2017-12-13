import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Field = ({
  children,
  input,
  label,
  placeholder,
  type,
  meta: { touched, error },
  // meta: { error },
  error2,
}) =>
  // console.log({ error });
  (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        {...input}
        placeholder={placeholder}
        valid={error2 ? false : undefined}
      >
        {children}
      </Input>
      {touched && error && <span>{error}</span>}
      {
      error2 === 'NOT_UNIQUE' &&
        <FormFeedback>{label} is not unique</FormFeedback>
    }
      {
      error2 === 'BLANK' &&
        <FormFeedback>{label} is required</FormFeedback>
    }
    </FormGroup>
  );
Field.propTypes = {
  children: PropTypes.node,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.Boolen,
    error: PropTypes.any,
  }).isRequired,
  error2: PropTypes.string,
};

Field.defaultProps = {
  children: undefined,
  placeholder: undefined,
  error2: undefined,
};

export default Field;
