import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import Input from '../../renderField';

// eslint-disable-next-line
const ProductsFields = ({ values, productsForSelect, addField, removeField, handleChange }) => (
  <Container>
    <Row>
      <Col>
        <Button
          type="button"
          name="add-product"
          onClick={addField}
          block
        >
          Add Product
        </Button>
      </Col>
    </Row>
    <Row>
      <Container>
        {values.map((value, index) => (
          // eslint-disable-next-line
          <Row key={index}>
            <div className="col-md-4">
              <Input type="select" name="product" onChange={handleChange} >
                <option>Select one</option>
                {
                  productsForSelect.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))
                }
              </Input>
            </div>
            <div className="col-md-4">
              <Input component="input" type="number" name="qty" onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <Button
                type="button"
                className="remove-product"
                onClick={removeField('products', index)}
              >
                Remove product
              </Button>
            </div>
          </Row>
        ))}
      </Container>
    </Row>
  </Container>
);
ProductsFields.defaultProps = {
  productsForSelect: [],
  values: [],
};

const Add = ({
  handleSubmit,
  handleChange,
  paymentOptions,
  clients,
  professionals,
  productsForSelect,
  values,
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
          />

          <Row>
            <div className="col-md-6">
              <Input
                onChange={handleChange}
                type="number"
                name="value"
                label="Price Charged"
                placeholder="Value"
              />
            </div>

            <div className="col-md-6">
              <Input
                type="select"
                name="payment_method"
                label="Payment Method"
                onChange={handleChange}
              >
                <option>Select one</option>
                {
                paymentOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))
              }
              </Input>
            </div>
          </Row>

          <Row>
            <div className="col-md-4">
              <Input
                component="input"
                type="date"
                name="date"
                label="Date"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <Input
                component="input"
                type="time"
                name="start_time"
                label="Start Time"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <Input
                component="input"
                type="time"
                name="end_time"
                label="End Time"
                onChange={handleChange}
              />
            </div>
          </Row>


          <Row>
            <div className="col-md-6">
              <Input
                type="select"
                name="id"
                value={values.client}
                label="Select Client"
                onChange={handleChange}
              >
                <option>Pick a Client</option>
                {
                clients.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))
              }
              </Input>
            </div>
            <div className="col-md-6">
              <Input
                type="select"
                name="id"
                value={values.professonal}
                label="Select Professional"
                onChange={handleChange}
              >
                <option>Pick A Professional</option>
                {
                professionals.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))
              }
              </Input>
            </div>
          </Row>

          <ProductsFields
            addField={addField}
            removeField={removeField}
            handleChange={handleChange}
            values={values.products}
            productsForSelect={productsForSelect}
          />

          <Button color="primary" block type="submit">Save Sale</Button>
        </Form>
      </Col>
    </Row>
  </Container>
);

// const temp = () => (
//   <FieldArray name="products" component={ProductsFields} productsForSelect={productsForSelect} />
// );

Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
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
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]))),
  ])).isRequired,
  productsForSelect: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Add;
