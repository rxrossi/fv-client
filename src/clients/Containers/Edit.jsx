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

  componentWillMount() {
    this.props.getClients();
    // place asyncActions.get

    // if state.clients.formFields.update.id !== this.props.clientId
    // find the client in the clients list and pass it to state.clients.formFields.update

    // updateFormFieldActions should have a method replace,
    // that would replace the whole state.clients.formFields.update with the given object

    // updateFormFieldActions should have a reset method

    // Form should have accept a prop of edit or update method
    // So it can addapt the texts at: Title and button

    // Probably containers will be reusable, think if it is possible
  }

  componentDidMount() {
    const client = this.props.clients.find(x => x.id === this.props.clientId);
    this.props.setFields(client);
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
  getClients: PropTypes.func.isRequired,
  setFields: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  clients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]))).isRequired,
};


const { asyncActions, updateFormFieldActions } = reusableReduxConfig(urls.CLIENTS, 'clients');
const formActions = updateFormFieldActions;

console.log(formActions);

const mapDispatch = {
  editClient: asyncActions.put,
  getClients: asyncActions.get,
  changeField: formActions.changeField,
  clearFields: formActions.clear,
  setFields: formActions.set,
};

const mapState = state => ({
  errors: state.clients.APIStatus.put.errors,
  values: state.clients.formFields.update,
  clients: state.clients.entities,
});

export { Edit };

export default connect(mapState, mapDispatch)(Edit);
