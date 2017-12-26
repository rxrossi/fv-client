import React from 'react';
import PropTypes from 'prop-types';

const Day = ({ date, handleClick, selectedDay }) => (
  <button
    type="button"
    onClick={() => handleClick(date)}
    selected={date === selectedDay}
  >
    {date.getDate()}
  </button>);
Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
};
Day.defaultProps = {
  selectedDay: undefined,
};

export default Day;
