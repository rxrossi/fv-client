import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import ViewComponent from '../Components/List';
import * as urls from '../../APIInfo';
import listHOC from '../../HOC/List';

const { asyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products');

const List = listHOC(ViewComponent);

const mapState = state => ({
  entities: state.products.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(List);
