import React from 'react';
import PropTypes from 'prop-types';
import Add from './Containers/Add';
import List from './Containers/List';
import ViewDetails from './Containers/ViewDetails';
import EditConnected from './Containers/Edit';

const Sales = ({ match }) => {
  if (match.params.id) {
    if (match.params.action === 'edit') {
      return <EditConnected entityId={match.params.id} />;
    }
    return (
      <ViewDetails entityId={match.params.id} />
    );
  }
  return (
    <div>
      <Add />
      <List />
    </div>
  );
};

Sales.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Sales;
