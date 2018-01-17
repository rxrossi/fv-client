import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import Input from '../../renderField';

const ProductsFields = ({
  values, errors, products, handleChange, handleAppendField, handleRemoveField,
}) => (
  <div>
    <Row className="text-center">
      <Col>
        { values && values.map((value, index) => (
          // eslint-disable-next-line
          <Row key={index} className="my-2 p-2 bg-light mx-1 product-row">
            <Col lg={4} md={12} sm={12} xs={12}>
              <Input
                type="select"
                name="id"
                value={value.id}
                error={errors[index] && errors[index].id}
                path={['products', index]}
                label="Select Product"
                onChange={handleChange}
              >
                <option>Select one</option>
                {
                  products.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))
                }
              </Input>
            </Col>
            <Col lg={3} md={12} sm={12} xs={12}>
              <Input
                component="input"
                type="number"
                value={value.qty}
                error={errors[index] && errors[index].qty}
                onChange={handleChange}
                placeholder="Quantity"
                label="Quantity"
                name="qty"
                path={['products', index]}
              />
            </Col>
            <Col lg={3} md={12} sm={12} xs={12}>
              <Input
                component="input"
                type="number"
                value={value.total_price}
                error={errors[index] && errors[index].total_price}
                onChange={handleChange}
                name="total_price"
                path={['products', index]}
                label="Total Value"
                placeholder="Total Value"
              />
            </Col>
            <Col lg={2} md={12} sm={12} xs={12}>
              <Button
                color="danger"
                block
                type="button"
                className="remove-product mt-4 pb-3"
                onClick={() => handleRemoveField('products', index)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
    <Row>
      <Col>
        <Button
          type="button"
          block
          className="add-product my-2"
          onClick={() => handleAppendField('products', { key: Date.now() })}
        >
          Add a product
        </Button>
      </Col>
    </Row>

  </div>
);
ProductsFields.propTypes = {
  handleAppendField: PropTypes.func.isRequired,
  handleRemoveField: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    avgPriceFiveLast: PropTypes.number,
  })),
  values: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]))),
  errors: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

ProductsFields.defaultProps = {
  products: [],
  values: [],
  errors: [],
};

const FormComponent = ({
  handleChange, handleSubmit, errors, values, handleAppendField, handleRemoveField, products,
}) => {
  console.log(values, products);
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={values.seller}
          error={errors.seller}
          onChange={handleChange}
          name="seller"
          label="Company"
          placeholder="The name of the company"
        />
        <Input
          type="date"
          value={values.date}
          error={errors.date}
          onChange={handleChange}
          name="date"
          label="Date"
        />
        <ProductsFields
          handleAppendField={handleAppendField}
          handleRemoveField={handleRemoveField}
          handleChange={handleChange}
          values={values.products}
          errors={errors.products}
          products={products}
        />
        <Button type="submit" color="primary" block>Save Sale</Button>
      </Form>
    </Container>
  );
};
FormComponent.propTypes = {
  handleAppendField: PropTypes.func.isRequired,
  handleRemoveField: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ])).isRequired,
  values: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]))),
  ])).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measure_unit: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    avgPriceFiveLast: PropTypes.number,
  })).isRequired,
};

export default FormComponent;
