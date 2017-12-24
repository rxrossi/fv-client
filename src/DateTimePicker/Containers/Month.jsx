import React from 'react';
import PropTypes from 'prop-types';
import Week from '../Components/Week';
import getWeeks from '../functions/getFullWeeksForAMonth';
import { WeeksContainer, WeekRow, WeekAbbreviation, MonthHeader } from '../styledComponents';

const Month = ({ month, year }) => {
  const weeks = getWeeks(month, year);
  return (
    <div>
      <MonthHeader>
        {
          new Date(year, month).toLocaleString('en-us', { month: 'long' })
        }
      </MonthHeader>
      <WeeksContainer>
        <WeekRow>
          <WeekAbbreviation>Sun</WeekAbbreviation>
          <WeekAbbreviation>Mon</WeekAbbreviation>
          <WeekAbbreviation>Tue</WeekAbbreviation>
          <WeekAbbreviation>Wed</WeekAbbreviation>
          <WeekAbbreviation>Thu</WeekAbbreviation>
          <WeekAbbreviation>Fri</WeekAbbreviation>
          <WeekAbbreviation>Sat</WeekAbbreviation>
        </WeekRow>
        {
          weeks.map(week => <Week key={week[0]} week={week} month={month} />)
        }
      </WeeksContainer>
    </div>
  );
};
Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default Month;
