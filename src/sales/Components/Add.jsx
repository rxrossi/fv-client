import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import Input from '../../renderField';
import FilterableSelect from '../../FilterableSelect';
import DateTimePicker from '../../DateTimePicker';

// eslint-disable-next-line
const ProductsFields = ({ values, errors, productsForSelect, addField, removeField, handleChange }) => {
  return (
    <Container>
      <Row>
        <Col>
          {values.map((value, index) => (
          // eslint-disable-next-line
          <Row key={index} className="my-2 p-2 bg-light mx-1 product-row">
            <div className="col-md-6">
              <FilterableSelect
                type="select"
                name="product"
                value={value.product}
                error={errors[index] && errors[index].product}
                path={['products', index]}
                handleChange={handleChange}
                label="Product"
                options={
                  productsForSelect.filter(x => x.quantity > 0)
                }
              />
            </div>
            <div className="col-md-4">
              <Input
                component="input"
                type="number"
                name="qty"
                value={value.qty}
                error={errors[index] && errors[index].qty}
                label={`Quantity ${
                    (value.product &&
                    productsForSelect &&
                    productsForSelect.find(x => x.id === value.product) &&
                    productsForSelect.find(x => x.id === value.product).measure_unit) || ''
                }`}
                path={['products', index]}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <Button
                type="button"
                color="danger"
                onClick={() => removeField('products', index)}
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
          onClick={addField}
          color="info"
          block
        >
        Add Product
        </Button>
      </Row>
    </Container>
  );
};
ProductsFields.defaultProps = {
  productsForSelect: [],
  values: [],
  errors: [],
};

const Add = ({
  handleClear,
  handleSubmit,
  handleChange,
  paymentOptions,
  clients,
  professionals,
  productsForSelect,
  values,
  errors,
  addField,
  removeField,
}) => (
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
            addField={addField}
            removeField={removeField}
            handleChange={handleChange}
            values={values.products}
            errors={errors.products}
            productsForSelect={productsForSelect}
          />

          <Row>
            <Col xs={8}>
              <Button color="primary" block type="submit">Save Sale</Button>
            </Col>
            <Col xs={4}>
              <Button color="danger" block type="button" onClick={handleClear}>Clear Form</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Container>
);

Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  paymentOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]))),
  ])).isRequired,
  errors: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.arrayOf(PropTypes.string),
  ])).isRequired,
  productsForSelect: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Add;
