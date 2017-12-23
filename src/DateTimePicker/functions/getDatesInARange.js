export default (begin, end) => {
  const MS_IN_A_DAY = 86400000;

  const arraysWithDays = [];
  const daysToAddToArray = (end - begin) / MS_IN_A_DAY;

  for (let i = 0; i <= daysToAddToArray; i += 1) {
    const dateToPush = new Date(begin).setDate(begin.getDate() + i);
    arraysWithDays.push(new Date(dateToPush));
  }

  return arraysWithDays;
};
