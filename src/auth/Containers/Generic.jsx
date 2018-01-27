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
        errors: {},
        successMsg: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { submit } = this.props;
    submit(this.state.fields)
      .then((res) => {
        this.setState(res);
      });
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
        errors={this.state.errors}
        successMsg={this.state.successMsg}
        registering={this.props.registering}
      />
    );
  }
}

Auth.defaultProps = {
  registering: false,
};

Auth.propTypes = {
  registering: PropTypes.bool,
  submit: PropTypes.func.isRequired,
};

export default Auth;
