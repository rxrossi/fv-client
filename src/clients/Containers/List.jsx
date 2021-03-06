import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import ListComponent from '../Components/List';
import * as urls from '../../APIInfo';
import listHOC from '../../HOC/List';
import { headerCreator } from '../../auth/actions';

const { asyncActions } = reusableReduxConfig(urls.CLIENTS, 'clients', headerCreator);

const List = listHOC(ListComponent);

const mapState = state => ({
  entities: state.clients.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export { List };

export default connect(mapState, mapDispatch)(List);
