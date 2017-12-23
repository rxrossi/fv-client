import React from 'react';
import PropTypes from 'prop-types';
import Week from '../Components/Week';
import getDates from '../functions/getFullWeeksForAMonth';

class Month extends React.Component {
  render() {
    return (
      <div>
        {

        }
      </div>
    );
  }
}
Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default Month;
