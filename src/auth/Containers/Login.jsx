import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';
import Generic from './Generic';

const Login = ({ loginFn }) => (
  <Generic
    submit={loginFn}
  />
);

Login.propTypes = {
  loginFn: PropTypes.func.isRequired,
};

export default connect(undefined, { loginFn: login })(Login);
