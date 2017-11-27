import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from './Containers/Add';
import View from './Containers/View';
import ViewOne from './Components/ViewOne';

const Products = ({ match, products }) => {
  if (match.params.id) {
    const product = products.find(item => item.id === match.params.id);
    if (product.name) {
      return <ViewOne product={product} />;
    }
    return <p>The product does not exist or could not be found</p>;
  }

  return (
    <div>
      <Add />
      <View />
    </div>
  );
};

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stock: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      date: PropTypes.string,
      sourceOrDestination: PropTypes.string,
    })),
  })).isRequired,
};

const mapState = state => ({
  products: state.products.list,
});

export default connect(mapState, undefined)(Products);
