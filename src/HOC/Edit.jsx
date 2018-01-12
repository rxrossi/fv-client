import React from 'react';
import PropTypes from 'prop-types';

export default (Component) => {
  class EditHOC extends React.Component {
    constructor(props) {
      super(props);
      const entityToEdit = props.entities.find(x => x.id === props.entityId);
      props.setFields(entityToEdit);
    }

    componentDidUpdate() {
      const {
        entities, entityId, setFields, fieldValues,
      } = this.props;

      const entityToEdit = entities.find(x => x.id === entityId);

      if (fieldValues.id !== entityToEdit.id) {
        setFields(entityToEdit);
      }
    }

    handleChange(name) {
      return e => this.props.changeField(name, e.target.value);
    }

    render() {
      return (
        <Component
          handleChange={this.handleChange}
        />
      );
    }
  }

  EditHOC.propTypes = {
    entities: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
    entityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setFields: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    fieldValues: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]))),
    ])).isRequired,
  };

  return EditHOC;
};

