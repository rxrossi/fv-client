import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import InputField from '../../renderField';

const FormComponent = ({
  handleSubmit, handleChange, values, errors, handleReset, updating,
}) => {
  const title = updating ? 'Edting user' : 'Add a new';
  const saveBtnTxt = updating ? 'Save Changes' : 'Register';
  const resetBtnTxt = updating ? 'Undo changes' : 'Reset Form';

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
            <InputField
              type="text"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              name="name"
              label="Name"
              placeholder="Enter the client name"
            />
            <InputField
              type="text"
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
              name="phone"
              label="Phone"
              placeholder="Enter the phone"
            />
            <Button type="submit" color="primary" block>{saveBtnTxt}</Button>
            <Button
              type="button"
              color="danger"
              onClick={handleReset}
              className="clearBtn"
              block
            >{resetBtnTxt}
            </Button>
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
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  updating: PropTypes.bool,
};
FormComponent.defaultProps = {
  values: {},
  errors: {},
  updating: false,
};

export default FormComponent;