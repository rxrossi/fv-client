import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import Add from '../Components/Add';
import { addClient } from '../actions/';

const AddReduxForm = reduxForm({
  form: 'addClients',
})(Add);

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
    this.props.reset('addClients');
  }

  render() {
    return (
      <AddReduxForm onSubmit={this.submit} errors={this.props.errors} />
    );
  }
}
AddContainer.propTypes = {
  addClient: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
};
AddContainer.defaultProps = {
  errors: {},
};

const mapState = state => ({
  errors: state.clients.addErrors,
});

export default connect(mapState, { addClient, reset })(AddContainer);
