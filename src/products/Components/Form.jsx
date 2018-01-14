import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Form, Row, Col } from 'reactstrap';
import Field from '../../renderField';

const FormComponent = ({
  handleSubmit, values, handleChange, handleReset, handleCancel, errors, updating,
}) => {
  const title = updating ? 'Editing product' : 'Adding a product';
  const btnTxt = updating ? 'Save' : 'Register';
  const resetBtnTxt = updating ? 'Discard unsaved changes' : 'Clear Form';
  return (
    <Container className="py-1">
      <Row>
        <Col>
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Field
              type="text"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
              label="Name"
              placeholder="Enter the product name"
            />
            <Field
              type="select"
              name="measure_unit"
              value={values.measure_unit}
              error={errors.measure_unit}
              onChange={handleChange}
              label="Measure Unit"
            >
              <option>Select one</option>
              <option value="ml">ml</option>
              <option value="mg">mg</option>
              <option value="unit">unit</option>
            </Field>
            <Button type="submit" color="primary" block>{btnTxt}</Button>
            <Button
              type="button"
              color="danger"
              onClick={handleReset}
              className="clearBtn"
              block
            >{resetBtnTxt}
            </Button>
            {
            updating &&
              <Button
                type="button"
                color="secondary"
                onClick={handleCancel}
                className="cancelBtn"
                block
              >Cancel
              </Button>
          }
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
FormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  updating: PropTypes.bool,
};

FormComponent.defaultProps = {
  values: {},
  errors: {},
  updating: false,
  handleCancel: () => {},
};

export default FormComponent;
