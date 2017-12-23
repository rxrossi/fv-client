export default (month, year) => {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const lastWeekDayOfMonth = new Date(year, month + 1, 0).getDay();
  const lasWeekDayOfLastWeek = new Date(year, month, lastDayOfMonth + (6 - lastWeekDayOfMonth));

  return lasWeekDayOfLastWeek;
};
