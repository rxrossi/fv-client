import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Table from '../../NoMoreTables';
import { getReadableDate, formatMoney } from '../../displayHelpers';

const EntryRow = ({ entry }) => (
  <tr>
    <td>{entry.product.name}</td>
    <td>{entry.qty}</td>
    <td>{formatMoney(entry.price_per_unit)} per {entry.product.measure_unit}</td>
  </tr>
);
EntryRow.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    qty: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

const ViewOne = ({ entity }) => {
  if (!entity) {
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

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-info text-center">Seller: {entity.seller} </h2>
          <p className="text-center">Date: {getReadableDate(entity.date)}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table mutateAt="0">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              { entity.stockEntries.map(entry =>
                <EntryRow entry={entry} key={entry.id} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
ViewOne.propTypes = {
  entity: PropTypes.shape({
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
  entity: undefined,
};

export default ViewOne;
