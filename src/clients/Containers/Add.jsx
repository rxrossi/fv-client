import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from '../Components/Add';
import { addClient, changeField } from '../actions/';


class AddContainer extends React.Component {
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
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapState = state => ({
  values: state.clients.fields,
  errors: state.clients.addErrors,
});

export default connect(mapState, { addClient, changeField })(AddContainer);
