import React from 'react';
import PropTypes from 'prop-types';

function listHOC(Component) {
  class List extends React.Component {
    componentDidMount() {
      this.props.fetchEntities();
    }

    render() {
      return <Component entities={this.props.entities} />;
    }
  }
  List.propTypes = {
    fetchEntities: PropTypes.func.isRequired,
    entities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  };

  return List;
}

export default listHOC;

