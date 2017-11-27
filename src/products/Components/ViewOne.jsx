import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ product }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Last Price</th>
        <th>Average price of last five</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>{product.price}</td>
        <td>{product.avgPriceFiveLast}</td>
      </tr>
    </tbody>
  </table>
);
Header.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

const Stock = ({ stock }) => {
  if (stock.length === 0) {
    return <p>No entries for this product yet</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
            <th>Source or Destination</th>
          </tr>
        </thead>
        <tbody>
          {
            stock.map(entry => (
              <tr key={entry.id}>
                <td>{entry.qty}</td>
                <td>{entry.price}</td>
                <td>{entry.date}</td>
                <td>{entry.sourceOrDestination}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
Stock.propTypes = {
  stock: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    qty: PropTypes.number,
    price: PropTypes.number,
    date: PropTypes.string,
    sourceOrDestination: PropTypes.string,
  })).isRequired,
};

const ViewOne = ({ product }) => (
  <div>
    <Header product={product} />
    <Stock stock={product.stock} />
  </div>
);
ViewOne.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired,
};

export default ViewOne;
