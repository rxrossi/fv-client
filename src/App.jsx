import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reusableReduxConfig from 'reusablecrudredux';
import Clients from './clients/';
import Professionals from './professionals/';
import Products from './products';
import Purchases from './purchases';
import Sales from './sales';
import NavBar from './NavBar';
import * as urls from './APIInfo';

const Home = () => <p>This is home</p>;

export const reducer = combineReducers({
  clients: reusableReduxConfig(urls.CLIENTS, 'clients').reducer,
  professionals: reusableReduxConfig(urls.PROFESSIONALS, 'professionals').reducer,
  products: reusableReduxConfig(urls.PRODUCTS, 'products').reducer,
  purchases: reusableReduxConfig(urls.PURCHASES, 'purchases').reducer,
  sales: reusableReduxConfig(urls.SALES, 'sales').reducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));

const RouterComponent = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/clients/:id?/:action?" component={Clients} />
      <Route path="/products/:id?/:action?" component={Products} />
      <Route path="/professionals/:id?/:action?" component={Professionals} />
      <Route path="/purchases/:id?/:action?" component={Purchases} />
      <Route path="/sales/:id?/:action?" component={Sales} />
    </div>
  </Router>
);

export default () => (
  <Provider store={store}>
    <RouterComponent />
  </Provider>
);
