import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ViewOneComponent from '../Components/ViewOne';
import { fetchProducts } from '../actions';

const mapState = state => ({
  products: state.products.list,
});

const mapDispatch = {
  fetchProducts,
};

class View extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const product = this.props.products.find(item => item.id === this.props.productId);
    return (
      <ViewOneComponent product={product} />
    );
  }
}

View.propTypes = {
  productId: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

export default withRouter(connect(mapState, mapDispatch)(View));
