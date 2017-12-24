import getFirstWeekDay from './getFirstWeekDay';
import getLastWeekDay from './getLastWeekDay';
import getDatesInARange from './getDatesInARange';
import divideInGroupsOfSeven from './divideInGroupsOfSeven';

export default (month, year) => {
  const begin = getFirstWeekDay(month, year);
  const end = getLastWeekDay(month, year);
  return divideInGroupsOfSeven(getDatesInARange(begin, end));
};
