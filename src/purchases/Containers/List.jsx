import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import List from '../Components/List';
import listHOC from '../../HOC/List';
import * as urls from '../../APIInfo';
import { headerCreator } from '../../auth/actions';

const { asyncActions } = reusableReduxConfig(urls.PURCHASES, 'purchases', headerCreator);
const ListComponent = listHOC(List);

const mapState = state => ({
  entities: state.purchases.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export { ListComponent };

export default connect(mapState, mapDispatch)(ListComponent);
