import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import * as urls from '../../APIInfo';
import ListComponent from '../Components/List';
import listHOC from '../../HOC/List';

const { asyncActions } = reusableReduxConfig(urls.SALES, 'sales');
const List = listHOC(ListComponent);

const mapState = state => ({
  entities: state.sales.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(List);
