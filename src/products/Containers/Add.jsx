import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from '../Components/Add';
import { addProduct, clearAddErrors } from '../actions/';

class AddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.clearAddErrors();
  }

  submit(values) {
    this.props.addProduct(values);
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  render() {
    return (
      <Add onSubmit={this.submit} errors={this.props.errors} />
    );
  }
}
AddContainer.propTypes = {
  addProduct: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  clearAddErrors: PropTypes.func.isRequired,
};
AddContainer.defaultProps = {
  errors: {},
};

const mapState = state => ({
  errors: state.products.addErrors,
});

export default connect(mapState, { addProduct, clearAddErrors })(AddContainer);
