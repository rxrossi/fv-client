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
    return <List clients={this.props.clients} />;
  }
}
Clients.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

const mapState = state => ({
  clients: state.clients.entities,
});

const mapDispatch = {
  fetchClients: asyncActions.get,
};

export default connect(mapState, mapDispatch)(Clients);
