import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions';

const Login = ({ logoutFn }) => {
  logoutFn();
  return (
    <p>logged out</p>
  );
};

Login.propTypes = {
  logoutFn: PropTypes.func.isRequired,
};

export default connect(undefined, { logoutFn: logout })(Login);
