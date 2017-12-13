import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Field = ({
  children,
  name,
  value,
  label,
  placeholder,
  onChange,
  type,
  error,
}) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input
      type={type}
      name={name}
      onChange={onChange(name)}
      value={value}
      placeholder={placeholder}
      valid={error ? false : undefined}
    >
      {children}
    </Input>
    {
      error === 'NOT_UNIQUE' &&
        <FormFeedback>{label} is not unique</FormFeedback>
    }
    {
      error === 'BLANK' &&
        <FormFeedback>{label} is required</FormFeedback>
    }
  </FormGroup>
);
Field.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
};

Field.defaultProps = {
  children: undefined,
  placeholder: undefined,
  value: '',
  error: undefined,
};

export default Field;
