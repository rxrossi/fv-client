import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComponent from '../Components/Add';
import { fetchProducts } from '../../products/actions';
import { fetchClients } from '../../clients/actions';
import { fetchProfessionals } from '../../professionals/actions';
import { addSale, changeField, appendToArrayOfFields, removeFromArrayOfFields, clearAddForm } from '../../sales/actions';

const paymentOptions = [
  'Money',
  'Debit',
  'Credit 1x',
  'Credit 2x',
  'Credit 3x',
];

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addProductsField = this.addProductsField.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchClients();
    this.props.fetchProfessionals();
  }

  handleChange(field, path) {
    return ({ target: { value } }) => {
      this.props.changeField([...path, field], value);
    };
  }

  addProductsField() {
    this.props.addField('products', {});
  }

  submit(e) {
    e.preventDefault();
    this.props.addSale(this.props.values);
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  render() {
    return (<AddComponent
      handleClear={this.props.clearAddForm}
      handleSubmit={this.submit}
      handleChange={this.handleChange}
      values={this.props.values}
      errors={this.props.addErrors}
      paymentOptions={this.props.paymentOptions}
      clients={this.props.clients}
      professionals={this.props.professionals}
      productsForSelect={this.props.productsForSelect}
      addField={this.addProductsField}
      removeField={this.props.removeField}
    />);
  }
}
Add.propTypes = {
  paymentOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  professionals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  productsForSelect: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetchClients: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  fetchProfessionals: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  clearAddForm: PropTypes.func.isRequired,
  addSale: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]))),
  ])).isRequired,
  /*eslint-disable*/
  addErrors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  /* eslint-enable */
};

const mapState = state => ({
  productsForSelect: state.products.list,
  clients: state.clients.list,
  professionals: state.professionals.list,
  addErrors: state.sales.addErrors,
  values: state.sales.fields,
  paymentOptions,
});

const mapDispatch = {
  fetchProducts,
  fetchClients,
  fetchProfessionals,
  addSale,
  removeField: removeFromArrayOfFields,
  addField: appendToArrayOfFields,
  changeField,
  clearAddForm,
};

export default connect(mapState, mapDispatch)(Add);

