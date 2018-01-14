import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Table from '../../NoMoreTables';
import { formatMoney } from '../../displayHelpers';
import DeleteModal from '../Containers/Delete';

export const NO_PRODUCTS_P_CLASS = 'no-products-msg';

const Product = ({ product }) => (
  <tr>
    <td data-title="Name">
      <Link className="btn btn-info" to={`/products/${product.id}`}>{product.name}</Link>
    </td>
    <td align="right" data-title="Quantity">
      {product.quantity} {product.measure_unit}
    </td>
    <td align="right" data-title="Price">
      {formatMoney(product.price_per_unit)} per {product.measure_unit}
    </td>
    <td align="right" data-title="Avg Price (5)">
      {formatMoney(product.avgPriceFiveLast)} per {product.measure_unit}
    </td>
    <td>
      <Link className="btn btn-info" to={`/products/${product.id}/edit`}>Edit</Link>
      <DeleteModal entity={product} >
        Delete
      </DeleteModal>
    </td>
  </tr>
);
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

const List = ({ entities }) => {
  if (entities.length) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <h2>Products List</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Average price of last five per each</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  entities.map(product =>
                    (<Product
                      key={product.id}
                      product={product}
                    />))
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container className="py-1">
      <Row>
        <Col>
          <h2>Products List</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            className={`${NO_PRODUCTS_P_CLASS} text-center text-info`}
          >
            No products registered yet
          </p>
        </Col>
      </Row>
    </Container>
  );
};

List.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};
List.defaultProps = {
  entities: [],
};
export default List;
