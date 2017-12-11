import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComponent from '../Components/Add';
import { fetchProducts } from '../../products/actions';
import { fetchClients } from '../../clients/actions';
import { fetchProfessionals } from '../../professionals/actions';
import { addSale } from '../../sales/actions';

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
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchClients();
    this.props.fetchProfessionals();
  }

  submit(values) {
    this.props.addSale(values);
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  render() {
    return (<AddComponent
      onSubmit={this.submit}
      errors={this.props.addErrors}
      paymentOptions={this.props.paymentOptions}
      clients={this.props.clients}
      professionals={this.props.professionals}
      productsForSelect={this.props.productsForSelect}
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
  addSale: PropTypes.func.isRequired,
  addErrors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  // reset: PropTypes.func.isRequired,
};

const mapState = state => ({
  productsForSelect: state.products.list,
  clients: state.clients.list,
  professionals: state.professionals.list,
  addErrors: state.sales.addErrors,
  paymentOptions,
});

const mapDispatch = {
  fetchProducts,
  fetchClients,
  fetchProfessionals,
  addSale,
};

export default connect(mapState, mapDispatch)(Add);

