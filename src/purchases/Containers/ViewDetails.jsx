import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewDetailsComponent from '../Components/ViewDetails';
import * as urls from '../../APIInfo';
import viewDetailsHOC from '../../HOC/ViewDetails';
import { headerCreator } from '../../auth/actions';

const ViewDetails = viewDetailsHOC(ViewDetailsComponent);

const { asyncActions } = reusableReduxConfig(urls.PURCHASES, 'purchases', headerCreator);

const mapState = state => ({
  entities: state.purchases.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default withRouter(connect(mapState, mapDispatch)(ViewDetails));
