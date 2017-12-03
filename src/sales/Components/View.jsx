import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const View = ({ sales }) => {
  if (!sales || sales.length === 0) {
    return <p>No sales registered yet</p>;
  }
  return (
    <div>
      <ul>
        {
          sales.map(sale => (
            <li key={sale.id}>
              <Link to={`/sales/${sale.id}`}>
                {sale.name}
              </Link>
              - {sale.client.name}
              - {sale.profit}
            </li>))
        }
      </ul>
    </div>
  );
};

View.propTypes = {
  sales: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

View.defaultProps = {
  sales: [],
};

export default View;
