import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from '../Components/Add';
import { addProduct, clearAddForm, changeField } from '../actions/';

class AddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.clearAddForm();
  }

  handleChange(field) {
    return ({ target: { value } }) => {
      this.props.changeField(field, value);
    };
  }

  submit(e) {
    e.preventDefault();
    this.props.addProduct(this.props.values);
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
  addProduct: PropTypes.func.isRequired,
  clearAddForm: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapState = state => ({
  values: state.products.fields,
  errors: state.products.addErrors,
});

export default connect(mapState, { addProduct, clearAddForm, changeField })(AddContainer);
