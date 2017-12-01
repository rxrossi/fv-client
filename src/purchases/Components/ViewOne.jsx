import React from 'react';
import PropTypes from 'prop-types';

const ViewOne = ({ purchase }) => {
  if (!purchase) {
    return <p>Could not find this purchase</p>;
  }
  return (
    <div>
      <p>{purchase.seller} - {purchase.date}</p>
      {
        purchase.stockEntries.map(entry =>
          (
            <li key={entry.id}>
              {entry.product.name} - {entry.qty} - {entry.price}
            </li>))
      }
    </div>
  );
};
ViewOne.propTypes = {
  purchase: PropTypes.shape({
    stockEntries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      qty: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })),
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
ViewOne.defaultProps = {
  purchase: undefined,
};

export default ViewOne;
