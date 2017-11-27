import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ViewComponent from '../Components/View';
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
    return (
      <ViewComponent products={this.props.products} baseUrl={this.props.location.pathname} />
    );
  }
}

View.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  fetchProducts: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(connect(mapState, mapDispatch)(View));
