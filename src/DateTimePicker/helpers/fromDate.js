export default (date) => {
  if (!(date instanceof Date)) {
    throw new Error(`${date} is not an instance of Date`);
  }
  return {
    minutes: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};
