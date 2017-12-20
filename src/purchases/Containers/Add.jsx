import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import AddComponent from '../Components/Add';
import { addPurchase, changeField } from '../actions';
import { fetchProducts } from '../../products/actions';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  handleChange(field) {
    return ({ target: { value } }) => {
      this.props.changeField(field, value);
    };
  }

  submit(e) {
    e.preventDefault();
    this.props.addPurchase(this.props.values);
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  render() {
    return (
      <AddComponent
        errors={this.props.addErrors}
        productsForSelect={this.props.productsForSelect}
        values={this.props.values}
        handleSubmit={this.submit}
        handleChange={this.handleChange}
      />);
  }
}

Add.propTypes = {
  productsForSelect: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  addPurchase: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  /*eslint-disable*/
  addErrors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  /* eslint-enable */
};


const mapDispatch = {
  addPurchase,
  reset,
  fetchProducts,
  changeField,
};

const mapState = state => ({
  productsForSelect: state.products.list,
  addErrors: state.purchases.addErrors,
  values: state.products.fields,
});

export default connect(mapState, mapDispatch)(Add);
