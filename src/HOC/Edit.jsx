import React from 'react';
import PropTypes from 'prop-types';

export default (Component, RedirectComponent) => {
  class EditHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = { shouldRedirect: false };
      const entityToEdit = props.entities.find(x => x.id === props.entityId);
      props.setFields(entityToEdit || {});
      props.fetchEntities();
      this.handleChange = this.handleChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAppendField = this.handleAppendField.bind(this);
      this.handleRemoveField = this.handleRemoveField.bind(this);
      this.fillValuesWithCorrectEntity = this.fillValuesWithCorrectEntity.bind(this);
    }

    componentDidUpdate() {
      this.fillValuesWithCorrectEntity();
    }

    fillValuesWithCorrectEntity({ force } = {}) {
      const {
        entities, entityId, setFields, fieldValues,
      } = this.props;

      const entityToEdit = entities.find(x => x.id === entityId);

      if ((entityToEdit && (fieldValues.id !== entityToEdit.id)) || force) {
        setFields(entityToEdit);
      }
    }

    handleAppendField(path, value) {
      this.props.appendField(path, value);
    }

    handleRemoveField(path) {
      this.props.removeField(path);
    }

    handleSubmit(e) {
      e.preventDefault();
      const { submit, fieldValues } = this.props;
      submit(fieldValues).then((success) => {
        if (success) {
          this.setState({ shouldRedirect: true });
        }
      });
    }

    handleChange(name) {
      return e => this.props.changeField(name, e.target.value);
    }

    handleReset() {
      this.props.clearFields();
      this.fillValuesWithCorrectEntity({ force: true });
    }

    handleCancel() {
      this.setState({ shouldRedirect: true });
    }


    render() {
      if (this.state.shouldRedirect) {
        return <RedirectComponent />;
      }

      const { fieldValues, errors } = this.props;

      return (
        <Component
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleReset={this.handleReset}
          handleCancel={this.handleCancel}
          values={fieldValues}
          errors={errors}
          updating
        />
      );
    }
  }

  EditHOC.propTypes = {
    entities: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
    entityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setFields: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    fetchEntities: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    clearFields: PropTypes.func.isRequired,
    appendField: PropTypes.func,
    removeField: PropTypes.func,
    fieldValues: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]))),
    ])).isRequired,
    errors: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]))),
    ])).isRequired,
  };

  EditHOC.defaultProps = {
    appendField: (() => {}),
    removeField: (() => {}),
  };


  return EditHOC;
};

