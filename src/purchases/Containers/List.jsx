import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import ListComponent from '../Components/List';
import listHOC from '../../HOC/List';
import * as urls from '../../APIInfo';

const { asyncActions } = reusableReduxConfig(urls.PURCHASES, 'purchases');
const List = listHOC(ListComponent);

const mapState = state => ({
  entities: state.purchases.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(List);
