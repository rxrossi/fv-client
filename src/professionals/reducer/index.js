const defaultState = {
  fetchError: undefined,
  addErrors: {},
  fetching: false,
  adding: false,
  list: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
