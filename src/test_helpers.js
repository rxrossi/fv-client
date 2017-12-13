export function changeFields(sut, objectOfChanges) {
  const changeField = (form, field, value) =>
    form.find(`input[name="${field}"]`).simulate('change', { target: { value } });

  Object.entries(objectOfChanges).forEach((item) => {
    const [field, value] = item;
    changeField(sut, field, value);
  });
}

export function getFieldValue(sut, field) {
  return sut.find(`input[name="${field}"]`).props().value;
}

// Ex of usage
// const changes = {
//    name: 'service of luck',
//    value: 300
//   },
// ;

// changeFields(sut, changes);
