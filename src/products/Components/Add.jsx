import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Form, Row, Col } from 'reactstrap';
import Field from '../../renderField';

const Add = ({
  handleSubmit, handleChange, values, errors,
}) => (
  <Container className="py-1">
    <Row>
      <Col>
        <h2>Add a new</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Field
            type="text"
            name="name"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            label="Name"
            placeholder="Enter the product name"
          />
          <Field
            type="select"
            name="measure_unit"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            label="Measure Unit"
          >
            <option>Select one</option>
            <option value="ml">ml</option>
            <option value="mg">mg</option>
            <option value="unit">unit</option>
          </Field>
          <Button type="submit" color="primary" block>Register</Button>
        </Form>
      </Col>
    </Row>
  </Container>
);
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  values: PropTypes.objectOf(PropTypes.string),
};
Add.defaultProps = {
  errors: {},
  values: {},
};

export default Add;
