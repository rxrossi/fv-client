import React from 'react';
import PropTypes from 'prop-types';
import Add from './Containers/Add';
import List from './Containers/List';
import ViewDetails from './Containers/ViewDetails';

const Sales = ({ match }) => {
  if (match.params.id) {
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
