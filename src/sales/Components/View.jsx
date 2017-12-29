import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';

const Sale = ({ sale }) => {
  const date = new Date(sale.start_time);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const dateToPrint = `${month}/${day}/${year}`;
  return (
    <tr>
      <td>
        <Link to={`/sales/${sale.id}`}>
          {sale.name}
        </Link>
      </td>
      <td>{sale.client.name}</td>
      <td>{sale.professional.name}</td>
      <td>{dateToPrint}</td>
      <td align="right">{parseInt(sale.profit, 10).toFixed(2)}</td>
      <td align="right">{sale.profit_per_hour}</td>
      <td align="right">{sale.time_spent}</td>
    </tr>
  );
};
Sale.propTypes = {
  sale: PropTypes.shape({
    client: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    professional: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    stockEntries: PropTypes.arrayOf(PropTypes.shape({
      product: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    })),
  }).isRequired,
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
            <th>Professional</th>
            <th>Date</th>
            <th className="text-right">Profit</th>
            <th className="text-right">Profit p/h</th>
            <th className="text-right">Time Spent</th>
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
    stockEntries: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]))),
  })),
};

View.defaultProps = {
  sales: [],
};

export default View;
