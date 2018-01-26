import React from 'react';
import PropTypes from 'prop-types';
import Component from '../Components/Form';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { submit } = this.props;
    submit(this.state.fields);
  }

  handleChange(name) {
    return (e) => {
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: e.target.value,
        },
      });
    };
  }

  render() {
    return (
      <Component
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        values={this.state.fields}
        errors={this.props.errors}
        registering={this.props.registering}
      />
    );
  }
}

Auth.defaultProps = {
  registering: false,
  errors: {},
};

Auth.propTypes = {
  registering: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
};

export default Auth;
