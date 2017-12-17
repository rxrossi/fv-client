import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import InputField from '../../renderField';

const Add = ({
  handleSubmit, values, handleChange, errors,
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
          <InputField
            type="text"
            onChange={handleChange}
            value={values.name}
            error={errors.name}
            name="name"
            label="Name"
            placeholder="Enter the professional's name"
          />
          <Button type="submit" color="primary" block>Register</Button>
        </Form>
      </Col>
    </Row>
  </Container>
);

Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
};
Add.defaultProps = {
  values: {},
  errors: {},
};

export default Add;
