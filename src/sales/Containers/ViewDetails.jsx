import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import ViewDetailsComponent from '../Components/ViewDetails';
import * as urls from '../../APIInfo';
import viewDetailsHOC from '../../HOC/ViewDetails';

const ViewDetails = viewDetailsHOC(ViewDetailsComponent);

const { asyncActions } = reusableReduxConfig(urls.SALES, 'sales');

const mapState = state => ({
  entities: state.sales.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(ViewDetails);
