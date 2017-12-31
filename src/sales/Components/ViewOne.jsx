import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Table from '../../NoMoreTables';
import { getReadableDateWithTime, formatMoney } from '../../displayHelpers';

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
      <h2>Basic details</h2>
      <Table mutateAt="991px">
        <thead>
          <tr>
            <th>Service name </th>
            <th>Client name</th>
            <th className="text-right">Value</th>
            <th className="text-right">Profit</th>
            <th className="text-right">Payment Method</th>
            <th className="text-right">Start time</th>
            <th className="text-right">End time</th>
            <th className="text-right">Time spent</th>
            <th className="text-right">Profit per hour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-title="Service name">{sale.name}</td>
            <td data-title="Client name">{sale.client.name}</td>
            <td data-title="Value charged" align="right">{formatMoney(sale.payment.value_total)}</td>
            <td data-title="Profit" align="right">{formatMoney(sale.profit)}</td>
            <td data-title="Payment method" align="right">{sale.payment.method}</td>
            <td data-title="Start time" align="right">{getReadableDateWithTime(sale.start_time)}</td>
            <td data-title="End time" align="right">{getReadableDateWithTime(sale.end_time)}</td>
            <td data-title="Time spent" align="right">{sale.time_spent} h</td>
            <td data-title="Profit per hour" align="right">{formatMoney(sale.profit_per_hour)}</td>
          </tr>
        </tbody>
      </Table>
      <h2>Products used</h2>
      { sale.stockEntries.length > 0 &&
      <Table mutateAt="0">
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
                  <td data-title="Name">
                    {entry.product.name}
                  </td>
                  <td data-title="Measure Unit" align="right">
                    {entry.qty} {entry.product.measure_unit}
                  </td>
                  <td data-title="Total Price" align="right">
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
