import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Form } from 'reactstrap';
import renderField from '../../renderField';

/* eslint-disable */
/* eslint-enable */

const Add = ({ handleSubmit, handleChange values, errors }) => (
  <Container className="py-1">
    <Form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="name"
        value={values.name}
        error={errors.name}
        component={renderField}
        label="Name"
        placeholder="Enter the product name"
      />
      <Field
        type="select"
        name="measure_unit"
        value={values.name}
        error={errors.name}
        label="Measure Unit"
        component={renderField}
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
  values: {},
};

export default Add;
