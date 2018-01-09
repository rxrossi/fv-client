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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setFieldsWithInitialData = this.setFieldsWithInitialData.bind(this);
  }

  componentWillMount() {
    return this.props.getClients();
  }

  componentDidUpdate() {
    if (this.props.values.id !== this.props.clientId) {
      this.setFieldsWithInitialData();
    }
  }

  setFieldsWithInitialData() {
    const client = this.props.clients.find(x => x.id === this.props.clientId);
    this.props.setFields(client || {});
  }

  handleReset() {
    const client = this.props.clients.find(x => x.id === this.props.clientId);
    this.props.setFields(client || {});
  }

  handleChange(name) {
    return e => this.props.changeField(name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editClient(this.props.values);
  }

  render() {
    const { values, errors } = this.props;
    return (
      <Form
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleReset={this.handleReset}
        values={values}
        errors={errors}
        updating
      />
    );
  }
}

Edit.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  changeField: PropTypes.func.isRequired,
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

const mapDispatch = {
  editClient: asyncActions.put,
  getClients: asyncActions.get,
  changeField: formActions.changeField,
  setFields: formActions.set,
};

const mapState = state => ({
  errors: state.clients.APIStatus.put.errors,
  values: state.clients.formFields.update,
  clients: state.clients.entities,
});

export { Edit };

export default connect(mapState, mapDispatch)(Edit);
