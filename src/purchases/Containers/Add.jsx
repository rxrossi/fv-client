import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import AddComponent from '../Components/Add';
import { addProfessional, clearAddErrors } from '../actions';

class Add extends React.Component {
  submit(values) {
    console.log(values);
  }
  render() {
    return (<AddComponent onSubmit={this.submit} />);
  }
}
