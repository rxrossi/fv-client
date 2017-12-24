import React from 'react';
import { MonthHeader } from '../styledComponents';

export default ({ year, month }) => (
  <MonthHeader>
    {
    new Date(year, month).toLocaleString('en-us', { month: 'long' })
  }
  </MonthHeader>
);
