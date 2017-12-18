import React from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import Input from '../../renderField';

/* eslint-disable */

const ProductsFields = ({ fields, products, handleChange, addField, removeField }) => (
  <div>
    <Row>
      <Col>
        <Button
          type="button"
          block
          onClick={addField}>
          Add a product
        </Button>
      </Col>
    </Row>
    <Row className="text-center">
      <Col>
        { fields && fields.map((product, index) => (
          <Row key={index} className="my-2 p-2 bg-light mx-1">
            <Col lg={4} md={12} sm={12} xs={12}>
              <Input
                type="select"
                name={`${product}.id`}
                label={`Select Product`}
                onChange={handleChange}
              >
                <option>Select one</option>
                {
                  products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))
                }
              </Input>
            </Col>
            <Col lg={3} md={12} sm={12} xs={12}>
              <Input
                component="input"
                type="number"
                onChange={handleChange}
                placeholder={`Quantity`}
                label={`Quantity`}
                name={`${product}.qty`}
              />
            </Col>
            <Col lg={3} md={12} sm={12} xs={12}>
              <Input
                component="input"
                type="number"
                onChange={handleChange}
                name={`${product}.total_price`}
                label={`Total Value`}
                placeholder="Total Value"
              />
            </Col>
            <Col lg={2} md={12} sm={12} xs={12}>
              <Button
                color="danger"
                block
                type="button"
                className="remove-product mt-4 pb-3"
                onClick={removeField}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </Col>
    </Row>

  </div>
);
ProductsFields.defaultProps = {
  productsForSelect: [],
}

const Add = ({ handleChange, handleSubmit, errors, values, addField, removeField, products }) => (
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
        addField={addField}
        removeField={removeField}
        handleChange={handleChange}
        fields={values.products}
        products={products}
      />
      <Button type="submit" color="primary" block>Save Sale</Button>
    </Form>
  </Container>
);

export default Add;
