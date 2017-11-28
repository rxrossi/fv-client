import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewComponent from '../Components/View';
import { fetchPurchases } from '../actions';

class View extends React.Component {
  componentDidMount() {
    this.props.fetchPurchases();
  }

  render() {
    return <ViewComponent purchases={this.props.purchases} />;
  }
}
View.propTypes = {
  purchases: PropTypes.arrayOf(PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetchPurchases: PropTypes.func.isRequired,
};


const mapState = state => ({
  purchases: state.purchases.list,
});

const mapDispatch = {
  fetchPurchases,
};

export default connect(mapState, mapDispatch)(View);
