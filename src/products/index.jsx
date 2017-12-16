import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from './Containers/Add';
import View from './Containers/View';
import ViewOne from './Containers/ViewOne';

const Products = ({ match }) => {
  if (match.params.id) {
    return <ViewOne productId={match.params.id} />;
  }

  return (
    <div>
      <Add />
      <View />
    </div>
  );
};

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

const mapState = state => ({
  products: state.products.list,
});

export default connect(mapState, undefined)(Products);
