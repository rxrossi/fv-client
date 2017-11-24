import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComponent from '../Components/Add';
import { addProfessional } from '../actions';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.addProfessional(values);
  }

  render() {
    return <AddComponent onSubmit={this.submit} />;
  }
}
Add.propTypes = {
  addProfessional: PropTypes.func.isRequired,
};

const mapDispatch = {
  addProfessional,
};

export default connect(undefined, mapDispatch)(Add);
