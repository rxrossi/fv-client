import React from 'react';
import PropTypes from 'prop-types';
import AddConnected from './Containers/Add';
import List from './Containers/List';
import EditConnected from './Containers/Edit';

const Clients = ({ match }) => {
  if (match.params.id) {
    if (match.params.action === 'edit') {
      return <EditConnected clientId={match.params.id} />;
    }
    return <p>TODO view one</p>;
  }

  return (
    <div>
      <AddConnected />
      <List />
    </div>
  );
};

Clients.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Clients;
