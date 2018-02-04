import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import * as urls from '../../APIInfo';
import ListComponent from '../Components/List';
import listHOC from '../../HOC/List';
import { headerCreator } from '../../auth/actions';

const { asyncActions } = reusableReduxConfig(urls.SALES, 'sales', headerCreator);
const ListContainer = listHOC(ListComponent);

const mapState = state => ({
  entities: state.sales.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export { ListContainer };
export default connect(mapState, mapDispatch)(ListContainer);
