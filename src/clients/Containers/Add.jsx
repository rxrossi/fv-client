import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from '../Components/Add';
import * as urls from '../../APIInfo';
/*eslint-disable*/
import reusableReduxConfig from 'reusablecrudredux';

const { asyncActions, createFormFieldActions } = reusableReduxConfig(urls.CLIENTS, 'clients');
const formActions = createFormFieldActions;

class AddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.props.clearAddErrors();
  // }

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
      <Add
        handleSubmit={this.submit}
        handleChange={this.handleChange}
        values={this.props.values}
        errors={this.props.errors}
      />
    );
  }
}
AddContainer.propTypes = {
  addClient: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  // clearAddErrors: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapState = state => ({
  values: state.clients.formFields.create,
  errors: state.clients.APIStatus.post.errors,
});

export default connect(mapState, {
  addClient: asyncActions.post,
  changeField: formActions.changeField,
  // clearAddErrors: formActions.clearErrors,
})(AddContainer);
