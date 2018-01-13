import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import List from '../Components/List';
import * as urls from '../../APIInfo';
import listHOC from '../../HOC/List';

const { asyncActions } = reusableReduxConfig(urls.CLIENTS, 'clients');

const ListContainer = listHOC(List);

const mapState = state => ({
  entities: state.clients.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(ListContainer);
