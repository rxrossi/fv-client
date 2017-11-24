import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewComponent from '../Components/View';
import { fetchProfessionals } from '../actions';

class View extends React.Component {
  componentDidMount() {
    this.props.fetchProfessionals();
  }

  render() {
    return <ViewComponent professionals={this.props.professionals} />;
  }
}
View.propTypes = {
  professionals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetchProfessionals: PropTypes.func.isRequired,
};

const mapState = state => ({
  professionals: state.professionals.list,
});
const mapDispatch = {
  fetchProfessionals,
};

export default connect(mapState, mapDispatch)(View);
