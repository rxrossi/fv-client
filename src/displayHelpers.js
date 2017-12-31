const pad2 = x => (x > 9 ? x : `0${x}`);

export const getReadableDate = (y) => {
  const date = new Date(y);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

export const getReadableDateWithTime = (y) => {
  const date = new Date(y);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours() + 1;
  const minutes = date.getUTCMinutes();
  return `${month}/${day}/${year} - ${pad2(hours)}:${pad2(minutes)}`;
};

export const formatMoney = x => parseFloat(x, 10).toFixed(2);
