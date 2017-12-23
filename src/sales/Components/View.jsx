import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';

const pad2 = number => (number < 10 ? '0' : '') + number;

const Sale = ({ sale }) => {
  const start = sale.start_time.split(':');
  const end = sale.end_time.split(':');
  const d1 = new Date(0, 0, 0, start[0], start[1]);
  const d2 = new Date(0, 0, 0, end[0], end[1]);
  const diff = new Date(d2 - d1);
  const timeSpent = `${diff.getHours()}:${pad2(diff.getMinutes())} h`;

  const date = new Date(sale.date);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const dateToPrint = `${month} ${day} ${year}`;
  return (
    <tr>
      <th>
        <Link to={`/sales/${sale.id}`}>
          {sale.name}
        </Link>
      </th>
      <th>{sale.client.name}</th>
      <th>{dateToPrint}</th>
      <th>{sale.profit}</th>
      <th>{timeSpent}</th>
    </tr>
  );
};
Sale.propTypes = {
  sale: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};


const View = ({ sales }) => {
  if (!sales || sales.length === 0) {
    return (
      <Container className="py-1">
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
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Client</th>
            <th>Date</th>
            <th>Profit</th>
            <th>Time Spent</th>
          </tr>
        </thead>
        <tbody>
          { sales.map(sale => <Sale key={sale.id} sale={sale} />) }
        </tbody>
      </Table>
    </Container>
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
