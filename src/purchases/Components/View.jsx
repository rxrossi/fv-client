import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const View = ({ purchases, baseUrl }) => {
  if (!purchases.length) {
    return <p>No purchases yet</p>;
  }
  return (
    <ul>
      {
        purchases.map(purchase => (
          <li key={purchase.id}>
            <Link to={`${baseUrl}/${purchase.id}`}>
              {purchase.seller}
            </Link>
            - {purchase.date} - {purchase.price}
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
  })).isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default View;
