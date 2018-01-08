import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props.clientId);
    // place asyncActions.get

    // if state.clients.formFields.update.id !== this.props.clientId
    // find the client in the clients list and pass it to state.clients.formFields.update

    // updateFormFieldActions should have a method replace,
    // that would replace the whole state.clients.formFields.update with the given object

    // updateFormFieldActions should have a reset method

    // Form should have accept a prop of edit or update method
    // So it can addapt the texts at: Title and button

    // server should send id and not just _id for clients and others
  }

  handleChange(name) {
    return e => this.props.changeField(name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editClient(this.props.values);
  }

  render() {
    const { clearFields, values, errors } = this.props;
    return (
      <Form
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClear={clearFields}
        values={values}
        errors={errors}
      />
    );
  }
}

Edit.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  changeField: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired,
  editClient: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
};


const { asyncActions, updateFormFieldActions } = reusableReduxConfig(urls.CLIENTS, 'clients');
const formActions = updateFormFieldActions;

const mapDispatch = {
  editClient: asyncActions.put,
  changeField: formActions.changeField,
  clearFields: formActions.clear,
};

const mapState = state => ({
  errors: state.clients.APIStatus.put.errors,
  values: state.clients.formFields.update,
});

export { Edit };

export default connect(mapState, mapDispatch)(Edit);
