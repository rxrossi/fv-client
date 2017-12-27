import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Day from './Day';

const DaysContainerWrapper = styled.div`
  padding-top: 0.5em;
  background: #fafeff;
  border-bottom: 0.05em solid blue;
  height: 14em;
  text-align: right;
`;

const WeekAbbreviation = styled.span`
  display: inline-block;
  color: #7ad;
  font-size: 0.7em;
  font-weight: bold;
  margin-bottom: 1.2em;
  padding-right: 0.5em;
  width: 3.46em;
`;

const WeeksAbbreviations = () => (
  <div>
    <WeekAbbreviation>Sun</WeekAbbreviation>
    <WeekAbbreviation>Mon</WeekAbbreviation>
    <WeekAbbreviation>Tue</WeekAbbreviation>
    <WeekAbbreviation>Wed</WeekAbbreviation>
    <WeekAbbreviation>Thu</WeekAbbreviation>
    <WeekAbbreviation>Fri</WeekAbbreviation>
    <WeekAbbreviation>Sat</WeekAbbreviation>
  </div>
);

const DaysContainer = ({
  days, handleClick, selectedDay, viewMonth,
}) => (
  <DaysContainerWrapper>
    <WeeksAbbreviations />
    { days.map(date =>
      (<Day
        key={date}
        date={date}
        viewMonth={viewMonth}
        handleClick={handleClick}
        selectedDay={selectedDay}
      />)) }
  </DaysContainerWrapper>
);
DaysContainer.propTypes = {
  days: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  viewMonth: PropTypes.number.isRequired,
};
DaysContainer.defaultProps = {
  selectedDay: undefined,
};

export default DaysContainer;
