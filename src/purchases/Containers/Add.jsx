import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import AddComponent from '../Components/Add';
import { addPurchase } from '../actions';
import { fetchProducts } from '../../products/actions';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  submit(values) {
    this.props.addPurchase(values);
    // this.props.reset('purchases add');
  }

  render() {
    return (
      <AddComponent
        errors={this.props.addErrors}
        onSubmit={this.submit}
        productsForSelect={this.props.productsForSelect}
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
  /*eslint-disable*/
  addErrors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  /* eslint-enable */
};


const mapDispatch = {
  addPurchase,
  reset,
  fetchProducts,
};

const mapState = state => ({
  productsForSelect: state.products.list,
  addErrors: state.purchases.addErrors,
});

export default connect(mapState, mapDispatch)(Add);
