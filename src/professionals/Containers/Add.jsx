import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import AddComponent from '../Components/Add';
import { addProfessional, clearAddErrors } from '../actions';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearAddErrors();
  }

  submit(values) {
    this.props.addProfessional(values);
    this.props.reset('professionals');
  }

  render() {
    return <AddComponent onSubmit={this.submit} errors={this.props.errors} />;
  }
}
Add.propTypes = {
  addProfessional: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  clearAddErrors: PropTypes.func.isRequired,
};

const mapState = state => ({
  errors: state.professionals.addErrors,
});

const mapDispatch = {
  addProfessional,
  reset,
  clearAddErrors,
};

export default connect(mapState, mapDispatch)(Add);
