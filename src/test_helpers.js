export function changeFields(sut, arrOfPairs) {
  const changeField = (sut, field, value) =>
    sut.find(`input[name="${field}"]`).simulate('change', { target: { value } });

  arrOfPairs.forEach((item) => {
    const [[field, value]] = Object.entries(item);
    changeField(sut, field, value);
  });
}

// Ex of usage
// const changes = [
//   { name: 'service of luck' },
//   { value: 300 },
// ];

// changeFields(sut, changes);
