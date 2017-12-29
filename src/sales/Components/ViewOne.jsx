import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Table } from 'reactstrap';

const getReadableDateWithTime = (y) => {
  const pad2 = x => (x > 9 ? x : `0${x}`);

  const date = new Date(y);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours() + 1;
  const minutes = date.getUTCMinutes();
  return `${month} ${day} ${year} - ${pad2(hours)}:${pad2(minutes)}`;
};

const ViewOne = ({ sale }) => {
  if (!sale) {
    return (
      <Container className="py-1">
        <Row>
          <Col>
            <p className="text-info text-center">
              The sale could not be found
            </p>
          </Col>
        </Row>
      </Container>
    );
  }


  return (
    <Container>
      <Table bordered>
        <thead>
          <tr>
            <th>Service name </th>
            <th>Client name</th>
            <th>Value</th>
            <th>Profit</th>
            <th>Payment Method</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Time spent</th>
            <th>Profit per hour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{sale.name}</td>
            <td>{sale.client.name}</td>
            <td>{parseInt(sale.payment.value_total, 10).toFixed(2)}</td>
            <td>{parseInt(sale.profit, 10).toFixed(2)}</td>
            <td>{sale.payment.method}</td>
            <td align="right">{getReadableDateWithTime(sale.start_time)}</td>
            <td align="right">{getReadableDateWithTime(sale.end_time)}</td>
            <td align="right">{sale.time_spent} h</td>
            <td align="right">{sale.profit_per_hour}</td>
          </tr>
        </tbody>
      </Table>

      { sale.stockEntries.length > 0 &&
      <Table>
        <thead>
          <tr>
            <th>Product name</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {
                sale.stockEntries.map(entry => (
                  <tr key={entry.id}>
                    <td>
                      {entry.product.name}
                    </td>
                    <td align="right">
                      {entry.qty}
                    </td>
                    <td align="right">
                      {`${(entry.qty * entry.price_per_unit).toFixed(2)}`}
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
