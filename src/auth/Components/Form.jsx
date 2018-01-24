import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Form, Button } from 'reactstrap';
import InputField from '../../renderField';

const Register = ({
  handleSubmit, handleChange, values, errors, registering,
}) => {
  const btnTxt = registering ? 'Register' : 'Login';
  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <InputField
            type="text"
            onChange={handleChange}
            value={values.name}
            error={errors.name}
            name="email"
            label="Email"
            placeholder="Email"
          />
          <InputField
            type="password"
            onChange={handleChange}
            value={values.name}
            error={errors.name}
            name="password"
            label="Password"
            placeholder="password"
          />
          {
          registering &&
            <InputField
              type="password"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              name="confirmPassword"
              label="Confirm password"
              placeholder="Type the password again"
            />
        }
          <Button type="submit" color="primary" block>{btnTxt}</Button>
        </Form>
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
