import React from 'react';
import PropTypes from 'prop-types';
import filterProps from './filterProps';

export default (Component, propsNamesToPass, callPropsOnMount = []) => {
  class CreateHOC extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAppendField = this.handleAppendField.bind(this);
      this.handleRemoveField = this.handleRemoveField.bind(this);

      callPropsOnMount.forEach(x => props[x]());
    }

    handleAppendField(path, value) {
      this.props.appendField(path, value);
    }

    handleRemoveField(path, index) {
      this.props.removeField(path, index);
    }

    handleSubmit(e) {
      e.preventDefault();
      const { submit, fieldValues } = this.props;
      submit(fieldValues);
    }

    handleChange(name, path = []) {
      return e => this.props.changeField([...path, name], e.target.value);
    }

    handleReset() {
      this.props.clearFields();
    }

    render() {
      const { fieldValues, errors, ...others } = this.props;

      return (
        <Component
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleReset={this.handleReset}
          handleAppendField={this.handleAppendField}
          handleRemoveField={this.handleRemoveField}
          values={fieldValues}
          errors={errors}
          {...filterProps(propsNamesToPass, others)}
        />
      );
    }
  }

  CreateHOC.propTypes = {
    submit: PropTypes.func.isRequired,
    clearFields: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    appendField: PropTypes.func,
    removeField: PropTypes.func,
    fieldValues: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
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

  CreateHOC.defaultProps = {
    appendField: (() => {}),
    removeField: (() => {}),
  };


  return CreateHOC;
};

