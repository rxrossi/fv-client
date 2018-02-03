// browserMocks.js
/* global window */
const localStorageMock = (function () {
  let store = {
    token: 'token',
  };

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
