import React from 'react';
import PropTypes from 'prop-types';

const View = ({ purchases }) => {
  if (!purchases.length) {
    return <p>No purchases yet</p>;
  }

  return (
    <ul>
      {
        purchases.map(purchase => (
          <li key={purchase.id}>
            {purchase.seller} - {purchase.date} - {purchase.price}
          </li>))
      }
    </ul>
  );
};
View.propTypes = {
  purchases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      qty: PropTypes.number,
      price: PropTypes.number,
    })),
  })).isRequired,
};

export default View;
