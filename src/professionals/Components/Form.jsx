import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import InputField from '../../renderField';

const Add = ({
  handleSubmit, values, handleChange, handleReset, handleCancel, errors, updating,
}) => {
  const title = updating ? 'Editing professional' : 'Adding a professional';
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
            <InputField
              type="text"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              name="name"
              label="Name"
              placeholder="Enter the professional's name"
            />
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

Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  updating: PropTypes.bool,
};
Add.defaultProps = {
  values: {},
  errors: {},
  updating: false,
  handleCancel: () => {},
};

export default Add;
