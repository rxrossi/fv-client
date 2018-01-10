import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import DeleteModal from '../Containers/DeleteModal';

export const NO_CLIENTS_P_CLASS = 'no-clients-msg';

const Client = ({ client }) => (
  <tr>
    <td>{client.name}</td>
    <td>{client.phone}</td>
    <td align="center" width="30%">
      <Link className="btn" to={`/clients/${client.id}/edit`}>Edit</Link>
      <DeleteModal entity={client} >
        Delete
      </DeleteModal>
    </td>
  </tr>
);
Client.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
export { Client };

const Clients = ({ clients }) => {
  if (clients.length) {
    return (
      <Container className="py-1">
        <Row>
          <Col>
            <h2>Clients list</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive hover striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  clients.map(client => (
                    <Client key={client.id} client={client} />
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
          <h2>Clients list</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={`${NO_CLIENTS_P_CLASS} text-info text-center`}>No clients yet, register some</p>
        </Col>
      </Row>
    </Container>
  );
};

Clients.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })),
};
Clients.defaultProps = {
  clients: [],
};

export default Clients;
