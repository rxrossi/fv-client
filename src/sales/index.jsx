import React from 'react';
import PropTypes from 'prop-types';
import Add from './Containers/Add';
import View from './Containers/View';
import ViewOne from './Containers/ViewOne';

const Sales = ({ match }) => {
  if (match.params.id) {
    return (
      <ViewOne saleId={match.params.id} />
    );
  }
  return (
    <div>
      <Add />
      <View />
    </div>
  );
};

Sales.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Sales;
