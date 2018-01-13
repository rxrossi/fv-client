import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import DeleteModal from '../Containers/DeleteModal';

export const NO_PROFESSIONALS_P_CLASS = 'no-professionals-msg';

const Professional = ({ professional }) => (
  <tr>
    <td>{professional.name}</td>
    <td>TODO</td>
    <td>
      <Link className="btn btn-info" to={`/professionals/${professional.id}/edit`}>Edit</Link>
      <DeleteModal entity={professional} >
        Delete
      </DeleteModal>
    </td>
  </tr>
);

Professional.propTypes = {
  professional: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const Professionals = ({ entities }) => {
  if (entities.length) {
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
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  entities.map(professional => (
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
  entities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};
Professionals.defaultProps = {
  entities: [],
};
export default Professionals;

