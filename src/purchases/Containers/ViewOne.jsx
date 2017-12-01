import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewOneComponent from '../Components/ViewOne';
import { fetchPurchases } from '../actions';

class View extends React.Component {
  componentDidMount() {
    this.props.fetchPurchases();
  }

  render() {
    const { purchaseId } = this.props;
    const purchase = this.props.purchases
      .find(item => item.id === purchaseId);
    return (<ViewOneComponent purchase={purchase} />);
  }
}

View.propTypes = {
  purchases: PropTypes.arrayOf(PropTypes.shape({
    stockEntries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      qty: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })),
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetchPurchases: PropTypes.func.isRequired,
  purchaseId: PropTypes.string.isRequired,
};

const mapState = state => ({
  purchases: state.purchases.list,
});

const mapDispatch = {
  fetchPurchases,
};

export default withRouter(connect(mapState, mapDispatch)(View));
