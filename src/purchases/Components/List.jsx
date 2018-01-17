import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Table from '../../NoMoreTables';
import { getReadableDate, formatMoney } from '../../displayHelpers';

const PurchaseRow = ({ purchase }) => (
  <tr>
    <td data-title="Seller">{purchase.seller}</td>
    <td data-title="Date" align="right">{getReadableDate(purchase.date)}</td>
    <td data-title="Total value" align="right">{formatMoney(purchase.price)}</td>
    <td data-title="Options">
      <Link to={`purchases/${purchase.id}`}>
          See details
      </Link>
    </td>
  </tr>
);
PurchaseRow.propTypes = {
  purchase: PropTypes.shape({
    id: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

const List = ({ entities }) => {
  if (!entities.length) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <h2>Purchases list</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-info text-center">No purchases yet</p>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container className="py-5">
      <h2>Purchases List</h2>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Seller</th>
            <th className="text-right">Date</th>
            <th className="text-right">Total Value</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          { entities.map(purchase =>
            <PurchaseRow key={purchase.id} purchase={purchase} />) }
        </tbody>
      </Table>
    </Container>
  );
};
List.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default List;
