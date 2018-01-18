import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import Input from '../../renderField';
import FilterableSelect from '../../FilterableSelect';
import DateTimePicker from '../../DateTimePicker';

const ProductsFields = ({
  values, errors, products, handleAppendField, handleRemoveField, handleChange,
}) => (
  <Container>
    <Row>
      <Col>
        {values.map((value, index) => (
          <Row key={value.key || value.product} className="my-2 p-2 bg-light mx-1 product-row">
            <div className="col-md-6">
              <FilterableSelect
                name="product"
                value={value.product}
                error={errors[index] && errors[index].product}
                path={['products', index]}
                handleChange={handleChange}
                label="Product"
                options={
                  products.filter(x => x.quantity > 0)
                }
              />
            </div>
            <div className="col-md-4">
              <Input
                type="number"
                name="qty"
                value={value.qty}
                error={errors[index] && errors[index].qty}
                label={`Quantity ${
                    (value.product &&
                    products &&
                    products.find(x => x.id === value.product) &&
                    products.find(x => x.id === value.product).measure_unit) || ''
                }`}
                path={['products', index]}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <Button
                type="button"
                color="danger"
                onClick={() => handleRemoveField('products', index)}
                className="remove-product mt-4 pb-3"
                block
              >
                Remove
              </Button>
            </div>
          </Row>
          ))}
      </Col>
    </Row>
    <Row>
      <Button
        type="button"
        className="add-product my-2"
        onClick={() => handleAppendField('products', { key: Date.now() })}
        color="info"
        block
      >
        Add Product
      </Button>
    </Row>
  </Container>
);

ProductsFields.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAppendField: PropTypes.func.isRequired,
  handleRemoveField: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
ProductsFields.defaultProps = {
  values: [],
  errors: [],
};

const FormComponent = ({
  handleReset,
  handleSubmit,
  handleChange,
  paymentOptions,
  clients,
  professionals,
  products,
  values,
  errors,
  handleAppendField,
  handleRemoveField,
}) => {
  console.log(values);
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Input
              onChange={handleChange}
              type="text"
              name="name"
              label="Service Name"
              placeholder="Name of the service"
              value={values.name}
              error={errors.name}
            />

            <Row>
              <Col className="text-center">
                <DateTimePicker
                  date={values.start_time}
                  error={errors.start_time}
                  name="start_time"
                  label="Start Time"
                  onChange={handleChange}
                />
              </Col>

              <Col className="text-center">
                <DateTimePicker
                  date={values.end_time}
                  error={errors.end_time}
                  name="end_time"
                  label="End Time"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Input
              onChange={handleChange}
              value={values.value}
              error={errors.value}
              type="number"
              name="value"
              label="Price Charged"
              placeholder="Value"
            />

            <FilterableSelect
              type="select"
              value={values.payment_method}
              error={errors.payment_method}
              name="payment_method"
              label="Payment Method"
              handleChange={handleChange}
              options={paymentOptions}
            />


            <FilterableSelect
              name="client"
              value={values.client}
              error={errors.client}
              label="Select Client"
              handleChange={handleChange}
              options={clients}
            />

            <FilterableSelect
              name="professional"
              value={values.professional}
              error={errors.professional}
              label="Select Professional"
              handleChange={handleChange}
              options={professionals}
            />

            <ProductsFields
              handleAppendField={handleAppendField}
              handleRemoveField={handleRemoveField}
              handleChange={handleChange}
              values={values.products}
              errors={errors.products}
              products={products}
            />

            <Row>
              <Col xs={8}>
                <Button color="primary" block type="submit">Save Sale</Button>
              </Col>
              <Col xs={4}>
                <Button color="danger" block type="button" onClick={handleReset}>Clear Form</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

FormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAppendField: PropTypes.func.isRequired,
  handleRemoveField: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  paymentOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  professionals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  values: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]))),
  ])).isRequired,
  errors: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.arrayOf(PropTypes.string),
  ])).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormComponent;
