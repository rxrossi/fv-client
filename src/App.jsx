import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reusableReduxConfig from 'reusablecrudredux';
import Clients from './clients/';
import Products from './products';
import products from './products/reducer';
import Professionals from './professionals';
import professionals from './professionals/reducer';
import Purchases from './purchases';
import purchases from './purchases/reducer';
import Sales from './sales';
import sales from './sales/reducer';
import NavBar from './NavBar';
import * as urls from './APIInfo';

const Home = () => <p>This is home</p>;

export const reducer = combineReducers({
  clients: reusableReduxConfig(urls.CLIENTS, 'clients').reducer,
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
