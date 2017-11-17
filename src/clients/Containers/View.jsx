import { connect } from 'react-redux';
import ViewComponent from '../Components/View';
import { fetchClients } from '../../clients/actions';

const mapState = state => ({
  clients: state.clients.list,
});

const mapDispatch = {
  fetchClients,
};

export default connect(mapState, mapDispatch)(ViewComponent);
