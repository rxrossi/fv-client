import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Table } from 'reactstrap';

export const NO_PROFESSIONALS_P_CLASS = 'no-professionals-msg';

const Professional = ({ professional }) => (
  <tr>
    <td>{professional.name}</td>
    <td>TODO</td>
  </tr>
);

Professional.propTypes = {
  professional: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const Professionals = ({ professionals }) => {
  if (professionals.length) {
    return (
      <Container className="py-1">
        <Row>
          <Col>
            <h2>Professionals list</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive hover striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {
                  professionals.map(professional => (
                    <Professional key={professional.id} professional={professional} />
                  ))
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
          <h2>Professionals list</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={`${NO_PROFESSIONALS_P_CLASS} text-info text-center`}>
            No professionals yet, register some
          </p>
        </Col>
      </Row>
    </Container>
  );
};
Professionals.propTypes = {
  professionals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};
Professionals.defaultProps = {
  professionals: [],
};
export default Professionals;

