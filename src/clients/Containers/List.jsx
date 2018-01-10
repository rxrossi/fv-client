import React from 'react';
import PropTypes from 'prop-types';
import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import List from '../Components/List';
import * as urls from '../../APIInfo';

const { asyncActions } = reusableReduxConfig(urls.CLIENTS, 'clients');

class Clients extends React.Component {
  componentDidMount() {
    this.props.fetchClients();
  }

  render() {
    return <List clients={this.props.clients} deleteFn={this.props.deleteFn} />;
  }
}
Clients.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
  clients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]))).isRequired,
};

const mapState = state => ({
  clients: state.clients.entities,
});

const mapDispatch = {
  fetchClients: asyncActions.get,
  deleteFn: asyncActions.delete,
};

export default connect(mapState, mapDispatch)(Clients);
