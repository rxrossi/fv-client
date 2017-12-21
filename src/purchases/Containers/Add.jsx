import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import AddComponent from '../Components/Add';
import { fetchProducts } from '../../products/actions';
import { addPurchase, changeField, appendToArrayOfFields, removeFromArrayOfFields, clearAddForm } from '../actions';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addProductsField = this.addProductsField.bind(this);
  }

  componentDidMount() {
    this.props.clearAddForm();
    this.props.fetchProducts();
  }

  handleChange(field, path) {
    return ({ target: { value } }) => {
      this.props.changeField([...path, field], value);
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

  addProductsField() {
    this.props.addField('products', {});
  }


  render() {
    // console.log(this.props.addErrors);
    return (
      <AddComponent
        errors={this.props.addErrors}
        products={this.props.productsForSelect}
        values={this.props.values}
        addField={this.addProductsField}
        removeField={this.props.removeField}
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
  clearAddForm: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
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
  clearAddForm,
  removeField: removeFromArrayOfFields,
  addField: appendToArrayOfFields,
};

const mapState = state => ({
  productsForSelect: state.products.list,
  addErrors: state.purchases.addErrors,
  values: state.purchases.fields,
});

export default connect(mapState, mapDispatch)(Add);
