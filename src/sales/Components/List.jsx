import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { getReadableDate, formatMoney } from '../../displayHelpers';
import Table from '../../NoMoreTables';

const Sale = ({ sale }) => (
  <tr>
    <td data-title="Service name">
      <Link to={`/sales/${sale.id}`}>
        {sale.name}
      </Link>
    </td>
    <td data-title="Client">{sale.client.name}</td>
    <td data-title="Professional">{sale.professional.name}</td>
    <td data-title="Start time">{getReadableDate(sale.start_time)}</td>
    <td data-title="Profit" align="right">{formatMoney(sale.profit)}</td>
    <td data-title="Profit p/h" align="right">{formatMoney(sale.profit_per_hour)}</td>
    <td data-title="Time spent" align="right">{sale.time_spent}</td>
  </tr>
);
Sale.propTypes = {
  sale: PropTypes.shape({
    client: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    professional: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    stockEntries: PropTypes.arrayOf(PropTypes.shape({
      product: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    })),
  }).isRequired,
};


const View = ({ entities }) => {
  if (!entities || entities.length === 0) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <h2>Sales list</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-info text-center">No sales registered yet</p>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container className="py-5">
      <h2>List of sale</h2>
      <Table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Client</th>
            <th>Professional</th>
            <th>Date</th>
            <th className="text-right">Profit</th>
            <th className="text-right">Profit p/h</th>
            <th className="text-right">Time Spent</th>
          </tr>
        </thead>
        <tbody>
          { entities.map(sale => <Sale key={sale.id} sale={sale} />) }
        </tbody>
      </Table>
    </Container>
  );
};

View.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stockEntries: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]))),
  })),
};

View.defaultProps = {
  entities: [],
};

export default View;
