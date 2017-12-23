import React from 'react';

const Month = ({ month, year }) =>
  <p>{month} {year} a</p>;

const DateTimePicker = () => (
  <div>
    <p>HI</p>
    <Month />
  </div>
);

export default DateTimePicker;
