import React from 'react';
import PropTypes from 'prop-types';
import Add from './Containers/Add';
import List from './Containers/List';
import EditConnected from './Containers/Edit';

const Professionals = ({ match }) => {
  if (match.params.id) {
    if (match.params.action === 'edit') {
      return <EditConnected entityId={match.params.id} />;
    }
    return <p>TODO view one</p>;
  }
  return (
    <div>
      <Add />
      <List />
    </div>
  );
};

Professionals.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Professionals;
