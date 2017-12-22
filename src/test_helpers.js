export function changeFields(sut, objectOfChanges) {
  const changeField = (field, value) => {
    const inputOrSelect =
      sut.find(`input[name="${field}"]`).length ?
        sut.find(`input[name="${field}"]`) :
        sut.find(`select[name="${field}"]`);

    inputOrSelect.simulate('change', { target: { value } });
  };

  Object.entries(objectOfChanges).forEach((item) => {
    const [field, value] = item;
    changeField(field, value);
  });
}

export function getFieldValue(sut, field) {
  const inputOrSelect =
    sut.find(`input[name="${field}"]`).length ?
      sut.find(`input[name="${field}"]`) :
      sut.find(`select[name="${field}"]`);

  return inputOrSelect.props().value;
}

// Ex of usage
// const changes = {
//    name: 'service of luck',
//    value: 300
//   },
// ;

// changeFields(sut, changes);
