import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Table from '../../NoMoreTables';
import { getReadableDate, formatMoney } from '../../displayHelpers';

const Header = ({ product }) => (
  <Table>
    <thead>
      <tr>
        <th width="40%">Name</th>
        <th className="text-right">Quantity</th>
        <th className="text-right">Last price per {product.measure_unit}</th>
        <th className="text-right">Average price of last five</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-title="Name">{product.name}</td>
        <td align="right" data-title="Total in stock">
          {product.quantity} { product.quantity > 0 ? product.measure_unit : ''}
        </td>
        <td align="right" data-title={`Price per ${product.measure_unit}`}>
          {formatMoney(product.price_per_unit)}
        </td>
        <td align="right" data-title={`Avg price (5) per ${product.measure_unit}`}>
          {formatMoney(product.avgPriceFiveLast)}
        </td>
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

const Stock = ({ product }) => {
  if (!product || !product.stock || product.stock.length === 0) {
    return <p className="text-info py-3">No entries for this product yet</p>;
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th width="40%">Source or Destination</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Price per {product.measure_unit}</th>
            <th className="text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            product.stock.map((entry) => {
              const className = entry.sale ? 'table-success' : 'table-info';
              return (
                <tr
                  key={entry.id}
                  className={className}
                >
                  <td data-title="Source or used at">
                    {entry.sourceOrDestination.name || entry.sourceOrDestination.seller}
                  </td>
                  <td align="right" data-title="Quantity">
                    {entry.sale ? '-' : '+'}
                    {entry.qty}
                  </td>
                  <td align="right" data-title={`price per ${product.measure_unit}`}>
                    {formatMoney(entry.price_per_unit)}
                  </td>
                  <td align="right" data-title="Date">
                    {getReadableDate(entry.date)}
                  </td>
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
  product: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      qty: PropTypes.number,
      price: PropTypes.number,
      date: PropTypes.string,
      sourceOrDestination: PropTypes.objectOf(PropTypes.string),
    })),
  ])).isRequired,
};
Stock.defaultProps = {
  stock: undefined,
};

const ViewOne = ({ product }) => {
  if (!product) {
    return (
      <Container className="py-1">
        <Row>
          <Col>
            <p className="text-info text-center">This product could not be found</p>
          </Col>
        </Row>
      </Container>);
  }

  return (
    <Container className="py-1">
      <Row>
        <Col>
          <h2>Overall Info</h2>
          <Header product={product} />
          <h2 className="pt-4">Stock entries</h2>
          <Stock product={product} />
        </Col>
      </Row>
    </Container>);
};
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
      sourceOrDestination: PropTypes.objectOf(PropTypes.string),
    })),
  }),
};
ViewOne.defaultProps = {
  product: undefined,
};

export default ViewOne;
