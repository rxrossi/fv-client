import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';

const { asyncActions, createFormFieldActions } = reusableReduxConfig(urls.CLIENTS, 'clients');
const formActions = createFormFieldActions;

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return ({ target: { value } }) => {
      this.props.changeField(field, value);
    };
  }

  submit(e) {
    e.preventDefault();
    this.props.addClient(this.props.values);
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  render() {
    return (
      <Form
        handleSubmit={this.submit}
        handleChange={this.handleChange}
        handleClear={this.props.clearFields}
        values={this.props.values}
        errors={this.props.errors}
      />
    );
  }
}
Add.propTypes = {
  addClient: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapState = state => ({
  values: state.clients.formFields.create,
  errors: state.clients.APIStatus.post.errors,
});

export { Add };

export default connect(mapState, {
  addClient: asyncActions.post,
  changeField: formActions.changeField,
  clearFields: formActions.clear,
})(Add);
