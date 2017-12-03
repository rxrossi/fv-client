import React from 'react';
import PropTypes from 'prop-types';

const ViewOne = ({ sale }) => {
  if (!sale) {
    return <p>The sale could not be found</p>;
  }

  return (
    <div>
      <p>{sale.name}</p>
      <p>{sale.client.name}</p>
      <p>{sale.profit}</p>
      <p>{sale.value}</p>

      <ul className="products-list">
        {
          sale.products.map(product => (
            <li key={product.id}>
              {product.name} - {product.qty} - {product.price}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

ViewOne.propTypes = {
  sale: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired,
    })),
  }),
};

ViewOne.defaultProps = {
  sale: undefined,
};

export default ViewOne;
