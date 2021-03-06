import React from 'react';
import PropTypes from 'prop-types';
import AddConnected from './Containers/Add';
import ListContainer from './Containers/List';
import EditConnected from './Containers/Edit';

const Clients = ({ match }) => {
  if (match.params.id) {
    if (match.params.action === 'edit') {
      // should I do this or the container itself can get the the param?
      // seems like it can be more reusable this way
      return <EditConnected entityId={match.params.id} />;
    }
    return <p>TODO view one</p>;
  }

  return (
    <div>
      <AddConnected />
      <ListContainer />
    </div>
  );
};

Clients.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Clients;
