import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import ViewComponent from '../Components/List';
import * as urls from '../../APIInfo';
import listHOC from '../../HOC/List';
import { headerCreator } from '../../auth/actions';

const { asyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products', headerCreator);

const ListContainer = listHOC(ViewComponent);

const mapState = state => ({
  entities: state.products.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(ListContainer);
