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
    return <AddComponent onSubmit={this.submit} errors={this.props.errors} />;
  }
}
Add.propTypes = {
  addProfessional: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapState = state => ({
  errors: state.professionals.addErrors,
});

const mapDispatch = {
  addProfessional,
};

export default connect(mapState, mapDispatch)(Add);
