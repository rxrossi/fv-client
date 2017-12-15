import React from 'react';
import PropTypes from 'prop-types';
import { Table, Container, Row, Col } from 'reactstrap';

const Header = ({ product }) => (
  <Table bordered>
    <thead>
      <tr>
        <th width="40%">Name</th>
        <th className="text-right">Quantity</th>
        <th className="text-right">Last Price</th>
        <th className="text-right">Average price of last five</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{product.name}</td>
        <td className="text-right">{product.quantity}</td>
        <td className="text-right">{product.price}</td>
        <td className="text-right">{product.avgPriceFiveLast}</td>
      </tr>
    </tbody>
  </Table>
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
  if (!stock || stock.length === 0) {
    return <p className="text-info">No entries for this product yet</p>;
  }

  return (
    <div>
      <Table responsive hover bordered>
        <thead>
          <tr>
            <th width="40%">Source or Destination</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Price</th>
            <th className="text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            stock.map((entry) => {
              const date = new Date(entry.date);
              const day = date.getUTCDate();
              const month = date.getUTCMonth() + 1;
              const year = date.getUTCFullYear();
              const dateToPrint = `${month} ${day} ${year}`;
              const className = entry.sale ? 'table-success' : 'table-info';
              return (
                <tr
                  key={entry.id}
                  className={className}
                >
                  <td>{entry.sourceOrDestination}</td>
                  <td className="text-right">
                    {entry.sale ? '-' : '+'}
                    {entry.qty}
                  </td>
                  <td className="text-right">{entry.price}</td>
                  <td className="text-right">{dateToPrint}</td>
                </tr>
              );
})
          }
        </tbody>
      </Table>
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
  })),
};
Stock.defaultProps = {
  stock: undefined,
};

const ViewOne = ({ product }) => (
  <Container>
    <Row>
      <Col>
        <h2>Overall Info</h2>
        <Header product={product} />
        <h2>Stock entries</h2>
        <Stock stock={product.stock} />
      </Col>
    </Row>
  </Container>
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
