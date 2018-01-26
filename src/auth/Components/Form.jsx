import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Form, Button, Col } from 'reactstrap';
import InputField from '../../renderField';

const Register = ({
  handleSubmit, handleChange, values, errors, registering,
}) => {
  const btnTxt = registering ? 'Register' : 'Login';
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <InputField
              type="text"
              onChange={handleChange}
              value={values.email}
              error={errors.email}
              name="email"
              label="Email"
              placeholder="Email"
            />
            <InputField
              type="password"
              onChange={handleChange}
              value={values.password}
              error={errors.password}
              name="password"
              label="Password"
              placeholder="Password"
            />
            {
              registering &&
                <InputField
                  type="password"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  name="confirmPassword"
                  label="Confirm password"
                  placeholder="Type the password again"
                />
            }
            <Button type="submit" color="primary" block>{btnTxt}</Button>
            <hr />
            {
              errors.general &&
                <p className="alert alert-danger text-center">{errors.general}</p>
            }
          </Form>

        </Col>
      </Row>
    </Container>
  );
};

Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  registering: PropTypes.bool,
};

Register.defaultProps = {
  values: {},
  errors: {},
  registering: false,
};

export default Register;
