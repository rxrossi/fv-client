import React from 'react';
import { DayBtn, WeekRow } from '../styledComponents';

export default ({
  week, day, month, year, handleClick,
}) => (
  <WeekRow>
    { week.map((date) => {
      const selected =
        day === date.getDate() && month === date.getMonth() && year === date.getFullYear();
      return (
        <DayBtn
          key={date}
          belongsToThisMonth={date.getMonth() === month}
          selected={selected}
          onClick={() => handleClick(date)}
        >
          {date.getDate()}
        </DayBtn>);
    }) }
  </WeekRow>
);
