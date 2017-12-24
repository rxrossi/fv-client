export default (array) => {
  const resp = [];
  while (array.length > 0) {
    resp.push(array.splice(0, 7));
  }
  return resp;
};
