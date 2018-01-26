import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import ViewDetailsComponent from '../Components/ViewDetails';
import * as urls from '../../APIInfo';
import viewDetailsHOC from '../../HOC/ViewDetails';
import { headerCreator } from '../../auth/actions';

const ViewDetails = viewDetailsHOC(ViewDetailsComponent);

const { asyncActions } = reusableReduxConfig(urls.SALES, 'sales', headerCreator);

const mapState = state => ({
  entities: state.sales.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(ViewDetails);
