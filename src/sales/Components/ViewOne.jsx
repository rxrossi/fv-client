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

      <ul className="products-list">
        {
          sale.stockEntries.map(entry => (
            <li key={entry.id}>
              {entry.product.name} - {entry.qty} - {entry.qty * entry.price_per_unit}
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
    profit: PropTypes.number.isRequired,
    payment: PropTypes.shape({
      method: PropTypes.string,
      value_total: PropTypes.number,
      value_liquid: PropTypes.number,
      discount: PropTypes.string,
      available_at: PropTypes.number,
    }).isRequired,
    stockEntries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      product: PropTypes.shape({
        name: PropTypes.string,
        qty: PropTypes.number,
        price_per_unit: PropTypes.number,
      }),
      qty: PropTypes.number.isRequired,
    })),
  }),
};

ViewOne.defaultProps = {
  sale: undefined,
};

export default ViewOne;
