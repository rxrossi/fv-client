import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewComponent from '../Components/View';
import { fetchClients } from '../../clients/actions';

class Clients extends React.Component {
  componentDidMount() {
    this.props.fetchClients();
  }

  render() {
    return <ViewComponent clients={this.props.clients} />;
  }
}
Clients.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

const mapState = state => ({
  clients: state.clients.list,
});

const mapDispatch = {
  fetchClients,
};

export default connect(mapState, mapDispatch)(Clients);
