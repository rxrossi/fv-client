import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSales } from '../actions';
import ViewOneComponent from '../Components/ViewOne';

class View extends React.Component {
  componentDidMount() {
    this.props.fetchSales();
  }

  render() {
    const sale = this.props.sales.find(s => s.id === this.props.saleId);
    return <ViewOneComponent sale={sale} />;
  }
}
View.propTypes = {
  fetchSales: PropTypes.func.isRequired,
  sales: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    client: PropTypes.objectOf(PropTypes.string),
    professional: PropTypes.objectOf(PropTypes.string),
  })).isRequired,
  saleId: PropTypes.string.isRequired,
};

const mapState = state => ({
  sales: state.sales.list,
});

const mapDispatch = {
  fetchSales,
};

export default connect(mapState, mapDispatch)(View);
