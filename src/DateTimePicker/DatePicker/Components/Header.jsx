import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ viewMonth, viewYear }) => {
  const monthName = new Date(0, viewMonth).toLocaleString('en-us', { month: 'long' });
  return (
    <p>{monthName} {viewYear}</p>
  );
};
Header.propTypes = {
  viewMonth: PropTypes.number.isRequired,
  viewYear: PropTypes.number.isRequired,
};

export default Header;
