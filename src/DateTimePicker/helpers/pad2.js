export default (digit) => {
  const x = parseInt(digit, 10);
  return (x > 9 && x.toString().length > 1 ? x : `0${x}`);
};

