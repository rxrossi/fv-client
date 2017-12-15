import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import clients from './clients/reducer';
import Clients from './clients/';
import Products from './products';
import products from './products/reducer';
import Professionals from './professionals';
import professionals from './professionals/reducer';
import Purchases from './purchases';
import purchases from './purchases/reducer';
import Sales from './sales';
import sales from './sales/reducer';
import * as salesActions from './sales/actionTypes';
import * as purchasesActions from './purchases/actionTypes';
import NavBar from './NavBar';

const Home = () => <p>This is home</p>;

const salesAddReducer = (state, action) => {
  switch (action.type) {
    case salesActions.ADD_SUCCESS:
      return undefined;
    default:
      return state;
  }
};

const purchasesAddReducer = (state, action) => {
  switch (action.type) {
    case purchasesActions.ADD_SUCCESS:
      return undefined;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  form: formReducer.plugin({
    'sales add': salesAddReducer,
    'purchases add': purchasesAddReducer,
  }),
  clients,
  products,
  professionals,
  purchases,
  sales,
});

export const store = createStore(reducer, applyMiddleware(thunk));

const RouterComponent = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/clients" component={Clients} />
      <Route path="/products/:id?" component={Products} />
      <Route path="/professionals" component={Professionals} />
      <Route path="/purchases/:id?" component={Purchases} />
      <Route path="/sales/:id?" component={Sales} />
    </div>
  </Router>
);

export default () => (
  <Provider store={store}>
    <RouterComponent />
  </Provider>
);
