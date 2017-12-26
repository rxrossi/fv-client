import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

const DaysContainer = ({ days, handleClick, selectedDay }) => (
  <div>
    { days.map(date =>
      <Day key={date} date={date} handleClick={handleClick} selectedDay={selectedDay} />) }
  </div>
);
DaysContainer.propTypes = {
  days: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
};
DaysContainer.defaultProps = {
  selectedDay: undefined,
};

export default DaysContainer;
