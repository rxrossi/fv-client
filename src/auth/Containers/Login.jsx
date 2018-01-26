import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';
import Generic from './Generic';

const Login = ({ loginFn, error }) => (
  <Generic
    submit={loginFn}
    errors={{ general: error }}
  />
);

Login.propTypes = {
  loginFn: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Login.defaultProps = {
  error: undefined,
};

const mapState = state => ({
  error: state.auth.errorMsg,
});

export default connect(mapState, { loginFn: login })(Login);
