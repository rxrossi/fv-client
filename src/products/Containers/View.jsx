import { connect } from 'react-redux';
import ViewComponent from '../Components/View';
import { fetchProducts } from '../actions';

const mapState = state => ({
  products: state.products.list,
});

const mapDispatch = {
  fetchProducts,
};

export default connect(mapState, mapDispatch)(ViewComponent);
