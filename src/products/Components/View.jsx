import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const NO_PRODUCTS_P_CLASS = 'no-products-msg';

const Product = ({ product, linkToViewOne }) => (
  <tr>
    <td>
      <Link to={linkToViewOne}>{product.name}</Link>
    </td>
    <td>
      {product.measure_unit}
    </td>
    <td>
      {product.quantity}
    </td>
    <td>
      {product.price}
    </td>
    <td>
      {product.avgPriceFiveLast}
    </td>
  </tr>
);
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  linkToViewOne: PropTypes.string.isRequired,
};

const View = ({ products, baseUrl }) => {
  if (products.length) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit of Measure</th>
            <th>Quantity</th>
            <th>price</th>
            <th>Average price of last five</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product =>
              (<Product
                key={product.id}
                product={product}
                linkToViewOne={`${baseUrl}/${product.id}`}
              />))
          }
        </tbody>
      </table>
    );
  }
  return (
    <p
      className={NO_PRODUCTS_P_CLASS}
    >
      No products registered yet
    </p>
  );
};

View.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  baseUrl: PropTypes.string.isRequired,
};
View.defaultProps = {
  products: [],
};
export default View;
