import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import InputField from '../../renderField';

/* eslint-disable */
const Add = (props) => {
  const { handleSubmit, error } = props;
  console.log(props);
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Field name="name" component={InputField} type="text" label="Name" />
            <Field name="phone" component={InputField} type="text" label="Phone" />
            <Button type="submit" color="primary" block>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line
  error: PropTypes.any.isRequired,
};

export default reduxForm({
  form: 'addClients',
})(Add);
