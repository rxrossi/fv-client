import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';

const PurchaseRow = ({ purchase, baseUrl }) => {
  const date = new Date(purchase.date);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const dateToPrint = `${month} ${day} ${year}`;
  return (
    <tr>
      <td>{purchase.seller}</td>
      <td>{dateToPrint}</td>
      <td>{purchase.price}</td>
      <td>
        <Link to={`${baseUrl}/${purchase.id}`}>
          See details
        </Link>
      </td>
    </tr>
  );
};
PurchaseRow.propTypes = {
  purchase: PropTypes.shape({
    id: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  baseUrl: PropTypes.string.isRequired,
};

const View = ({ purchases, baseUrl }) => {
  if (!purchases.length) {
    return (
      <Container className="py-1">
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
    <Container className="py-1">
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Seller</th>
            <th>Date</th>
            <th>Total Value</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          { purchases.map(purchase =>
            <PurchaseRow key={purchase.id} purchase={purchase} baseUrl={baseUrl} />) }
        </tbody>
      </Table>
    </Container>
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
