import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComponent from '../Components/Add';
import { addProfessional, clearAddForm, changeField } from '../actions';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearAddForm();
  }

  handleChange(field) {
    return ({ target: { value } }) => {
      this.props.changeField(field, value);
    };
  }

  submit(e) {
    e.preventDefault();
    this.props.addProfessional(this.props.values);
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  render() {
    return (
      <AddComponent
        handleSubmit={this.submit}
        handleChange={this.handleChange}
        values={this.props.values}
        errors={this.props.errors}
      />
    );
  }
}
Add.propTypes = {
  addProfessional: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  clearAddForm: PropTypes.func.isRequired,
};

const mapState = state => ({
  values: state.professionals.fields,
  errors: state.professionals.addErrors,
});

const mapDispatch = {
  addProfessional,
  clearAddForm,
  changeField,
};

export default connect(mapState, mapDispatch)(Add);
