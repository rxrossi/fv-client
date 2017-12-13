import React from 'react';
import PropTypes from 'prop-types';
// import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import Add from '../Components/Add';
import { addClient } from '../actions/';


class AddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.addClient(values);
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  render() {
    return (
      <Add onSubmit={this.submit} />
    );
  }
}
AddContainer.propTypes = {
  addClient: PropTypes.func.isRequired,
};

export default connect(undefined, { addClient })(AddContainer);
