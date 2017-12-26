import getFirstWeekDay from './getFirstWeekDay';
import getLastWeekDay from './getLastWeekDay';
import getDatesInARange from './getDatesInARange';

export default (month, year) => {
  const begin = getFirstWeekDay(month, year);
  const end = getLastWeekDay(month, year);
  return getDatesInARange(begin, end);
};
