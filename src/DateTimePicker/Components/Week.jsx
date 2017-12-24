import React from 'react';
import { DayBtn, WeekRow } from '../styledComponents';

export default ({ week, month }) => (
  <WeekRow>
    { week.map(day => (
      <DayBtn key={day} belongsToThisMonth={day.getMonth() === month}>{day.getDate()}</DayBtn>)) }
  </WeekRow>
);
