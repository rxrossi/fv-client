import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Field = ({
  children,
  name,
  path,
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
      onChange={onChange(name, path)}
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
      error === 'NOT_POSITIVE' &&
        <FormFeedback>{label} must be greater than zero</FormFeedback>
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
  path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  error: PropTypes.string,
};

Field.defaultProps = {
  children: undefined,
  placeholder: undefined,
  value: '',
  path: [],
  error: undefined,
};

export default Field;
