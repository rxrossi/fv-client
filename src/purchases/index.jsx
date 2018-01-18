import React from 'react';
import PropTypes from 'prop-types';
import Add from './Containers/Add';
import List from './Containers/List';
import ViewDetails from './Containers/ViewDetails';
import EditConnected from './Containers/Edit';

const Purchases = ({ match }) => {
  if (match.params.id) {
    if (match.params.action === 'edit') {
      // should I do this or the container itself can get the the param?
      // seems like it can be more reusable this way

      return <EditConnected entityId={match.params.id} />;
    }
    return <ViewDetails entityId={match.params.id} />;
  }
  return (
    <div>
      <Add />
      <List />
    </div>
  );
};

Purchases.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Purchases;
