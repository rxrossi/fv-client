import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Table from '../../NoMoreTables';
import { formatMoney } from '../../displayHelpers';

export const NO_PRODUCTS_P_CLASS = 'no-products-msg';

const Product = ({ product, linkToViewOne }) => (
  <tr>
    <td data-title="Name">
      <Link to={linkToViewOne}>{product.name}</Link>
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
  linkToViewOne: PropTypes.string.isRequired,
};

const View = ({ products, baseUrl }) => {
  if (products.length) {
    return (
      <Container className="py-1">
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
                </tr>
              </thead>
              <tbody>
                {
                  products.map(product =>
                    (<Product
                      key={product.id}
                      product={product}
                      linkToViewOne={`${baseUrl}/${product.id}`}
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

View.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgPriceFiveLast: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  baseUrl: PropTypes.string.isRequired,
};
View.defaultProps = {
  products: [],
};
export default View;
