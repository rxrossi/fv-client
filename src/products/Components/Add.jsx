import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form } from 'reactstrap';
import renderField from '../../renderField';

/* eslint-disable */
/* eslint-enable */

const Add = ({ handleSubmit, errors }) => (
  <Container className="py-1">
    <Form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="name"
        component={renderField}
        label="Name"
        placeholder="Enter the product name"
        error2={errors.name}
      />
      <Field
        type="select"
        name="measure_unit"
        label="Measure Unit"
        component={renderField}
        error2={errors.measure_unit}
      >
        <option>Select one</option>
        <option value="ml">ml</option>
        <option value="mg">mg</option>
        <option value="unit">unit</option>
      </Field>
      <Button type="submit" color="primary" block>Register</Button>
    </Form>
  </Container>
);
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
};
Add.defaultProps = {
  errors: {},
};

export default reduxForm({
  form: 'addProducts form',
})(Add);
