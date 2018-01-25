import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import ViewDetailsPrensentational from '../Components/ViewDetails';
import * as urls from '../../APIInfo';
import viewDetailsHOC from '../../HOC/ViewDetails';
import { headerCreator } from '../../auth/actions';

const ViewDetails = viewDetailsHOC(ViewDetailsPrensentational);

const { asyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products', headerCreator);

const mapState = state => ({
  errors: state.products.APIStatus.put.errors,
  entities: state.products.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(ViewDetails);
