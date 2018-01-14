import React from 'react';
import PropTypes from 'prop-types';

export default (Component) => {
  class ViewDetailsHOC extends React.Component {
    constructor(props) {
      super(props);
      const entity = props.entities.find(x => x.id === props.entityId);
      if (!entity) {
        props.fetchEntities();
      }
    }

    render() {
      const entity = this.props.entities.find(x => x.id === this.props.entityId);
      return (
        <Component entity={entity} />
      );
    }
  }

  ViewDetailsHOC.propTypes = {
    entities: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
    entityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fetchEntities: PropTypes.func.isRequired,
  };

  return ViewDetailsHOC;
};

