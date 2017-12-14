import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import InputField from '../../renderField';

/* eslint-disable */
const Add = ({ handleSubmit, handleChange, values, errors }) => {
  return (
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
              placeholder="Enter the client name"
            />
            <InputField
              type="text"
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
              name="phone"
              label="Phone"
              placeholder="Enter the phone"
            />
            <Button type="submit" color="primary" block>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fieldValues: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
};
Add.defaultProps = {
  fieldValues: {},
  errors: {},
}

export default Add;
