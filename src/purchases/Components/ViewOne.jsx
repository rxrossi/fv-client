import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Table } from 'reactstrap';

const EntryRow = ({ entry }) => (
  <tr>
    <td>{entry.product.name}</td>
    <td>{entry.qty}</td>
    <td>{entry.price}</td>
  </tr>
);
EntryRow.propTypes = {
  entry: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    qty: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

const ViewOne = ({ purchase }) => {
  if (!purchase) {
    return (
      <Container className="py-1">
        <Row>
          <Col>
            <h2>Purchase details</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-info text-center">Could not find this purchase</p>
          </Col>
        </Row>
      </Container>
    );
  }

  const date = new Date(purchase.date);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const dateToPrint = `${month} ${day} ${year}`;

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-info text-center">Seller: {purchase.seller} </h2>
          <p className="text-center">Date: {dateToPrint}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              { purchase.stockEntries.map(entry =>
                <EntryRow entry={entry} key={entry.id} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
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
