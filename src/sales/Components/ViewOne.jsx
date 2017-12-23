import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Table } from 'reactstrap';

const pad2 = number => (number < 10 ? '0' : '') + number;

const ViewOne = ({ sale }) => {
  if (!sale) {
    return (
      <Container className="py-1">
        <Row>
          <Col>
            <p className="text-info text-center">
              This sale could not be found
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
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
    <Container>
      <Table bordered>
        <thead>
          <tr>
            <th>Service name </th>
            <th>Client name</th>
            <th>Value</th>
            <th>Profit</th>
            <th>Date</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Total Time</th>
            <th>Spent Time</th>
            <th>Profit per hour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{sale.name}</td>
            <td>{sale.client.name}</td>
            <td>{sale.value}</td>
            <td>{sale.profit}</td>
            <td>{dateToPrint}</td>
            <td>{sale.start_time}</td>
            <td>{sale.end_time}</td>
            <td>{timeSpent}</td>
            <td>Spent Time</td>
            <td>Profit per hour</td>
          </tr>
        </tbody>
      </Table>

      { sale.stockEntries.length > 0 &&
      <Table>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            sale.stockEntries.map(entry => (
              <tr key={entry.id}>
                <td>
                  {entry.product.name}
                </td>
                <td>
                  {entry.qty}
                </td>
                <td>
                  {entry.qty * entry.price_per_unit}
                </td>
              </tr>
            ))
          }
        </tbody>

      </Table>
      }
    </Container>
  );
};

ViewOne.propTypes = {
  sale: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profit: PropTypes.number.isRequired,
    payment: PropTypes.shape({
      method: PropTypes.string,
      value_total: PropTypes.number,
      value_liquid: PropTypes.number,
      discount: PropTypes.string,
      available_at: PropTypes.number,
    }).isRequired,
    stockEntries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      product: PropTypes.shape({
        name: PropTypes.string,
        qty: PropTypes.number,
        price_per_unit: PropTypes.number,
      }),
      qty: PropTypes.number.isRequired,
    })),
  }),
};

ViewOne.defaultProps = {
  sale: undefined,
};

export default ViewOne;
