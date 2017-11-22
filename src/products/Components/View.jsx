import React from 'react';
import PropTypes from 'prop-types';

export const NO_PRODUCTS_P_CLASS = 'no-products-msg';

const Product = ({ product }) => (
  <li>
    {product.name} - Measure Unit: {product.measure_unit}
  </li>
);
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    measure_unit: PropTypes.string.isRequired,
  }).isRequired,
};

class View extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products } = this.props;

    if (products.length) {
      return (
        <ul>
          {
            products.map(product => <Product key={product.id} product={product} />)
          }
        </ul>
      );
    }

    return (
      <p
        className={NO_PRODUCTS_P_CLASS}
      >
        No products registered yet
      </p>
    );
  }
}
View.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    measure_unit: PropTypes.string.isRequired,
  })),
  fetchProducts: PropTypes.func.isRequired,
};
View.defaultProps = {
  products: [],
};
export default View;
