import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSales } from '../actions';
import ViewComponent from '../Components/View';

class View extends React.Component {
  componentDidMount() {
    this.props.fetchSales();
  }

  render() {
    return <ViewComponent sales={this.props.sales} />;
  }
}
View.propTypes = {
  fetchSales: PropTypes.func.isRequired,
  sales: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    client: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    professional: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  })).isRequired,
};

const mapState = state => ({
  sales: state.sales.list,
});

const mapDispatch = {
  fetchSales,
};

export default connect(mapState, mapDispatch)(View);
