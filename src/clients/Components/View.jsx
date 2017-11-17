import React from 'react';
import PropTypes from 'prop-types';

export const NO_CLIENTS_P_CLASS = 'no-clients-msg';

const Client = ({ client }) => (
  <li>{client.name}, {client.phone}</li>
);
Client.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
export { Client };

class Clients extends React.Component {
  componentDidMount() {
    this.props.fetchClients();
  }

  render() {
    const { clients } = this.props;
    return !clients.length ?
      <p className={NO_CLIENTS_P_CLASS}>No clients yet, register some</p>
      :
      <ul>
        {
          clients.map(client => (
            <Client key={client.id} client={client} />
          ))
        }
      </ul>;
  }
}
Clients.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })),
  fetchClients: PropTypes.func.isRequired,
};
Clients.defaultProps = {
  clients: [],
};

export default Clients;
