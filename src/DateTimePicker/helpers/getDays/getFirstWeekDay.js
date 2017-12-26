// month is 0-11
export default (month, year) => {
  const date = new Date(year, month);

  const firstWeekDayOfMonth = date.getDay();
  const firstWeekDayOfWeek = new Date(year, month, -firstWeekDayOfMonth + 1);

  // const firstWeekDayOfWeek =

  return firstWeekDayOfWeek;
};
