import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import ListComponent from '../Components/List';
import * as urls from '../../APIInfo';
import listHOC from '../../HOC/List';
import { headerCreator } from '../../auth/actions';

const { asyncActions } = reusableReduxConfig(urls.PROFESSIONALS, 'professionals', headerCreator);

const ListContainer = listHOC(ListComponent);

const mapState = state => ({
  entities: state.professionals.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

export default connect(mapState, mapDispatch)(ListContainer);
