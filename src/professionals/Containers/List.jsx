import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import ListComponent from '../Components/List';
import * as urls from '../../APIInfo';
import listHOC from '../../HOC/List';

const { asyncActions } = reusableReduxConfig(urls.PROFESSIONALS, 'professionals');

const ListContainer = listHOC(ListComponent);

const mapState = state => ({
  entities: state.professionals.entities,
});

const mapDispatch = {
  fetchEntities: asyncActions.get,
};

// class List extends React.Component {
//   componentDidMount() {
//     this.props.fetchProfessionals();
//   }

//   render() {
//     return <ListComponent professionals={this.props.professionals} />;
//   }
// }
// List.propTypes = {
//   professionals: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//   })).isRequired,
//   fetchProfessionals: PropTypes.func.isRequired,
// };

// const mapState = state => ({
//   professionals: state.professionals.list,
// });
// const mapDispatch = {
//   fetchProfessionals,
// };

export default connect(mapState, mapDispatch)(ListContainer);
