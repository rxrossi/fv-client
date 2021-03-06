import React from 'react';
import PropTypes from 'prop-types';
import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import DeleteModalComponent from '../../DeleteModalPresentational';
import * as urls from '../../APIInfo';
import { headerCreator } from '../../auth/actions';

const DeleteModal = ({ entity, deleteFn }) => (
  <DeleteModalComponent
    deleteFunction={() => deleteFn(entity.id)}
    entityName={entity.name}
  />);

DeleteModal.propTypes = {
  deleteFn: PropTypes.func.isRequired,
  entity: PropTypes.objectOf(PropTypes.any).isRequired,
};

const { asyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products', headerCreator);

export default connect(undefined, {
  deleteFn: asyncActions.delete,
})(DeleteModal);
