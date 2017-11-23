import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
} from 'react-router-dom';
import clients from './clients/reducer';
import Clients from './clients/';
import Products from './products';
import products from './products/reducer';
import Professionals from './professionals';

const Home = () => (
  <p>This is home</p>
);

export const reducer = combineReducers({
  form: formReducer,
  clients,
  products,
});

export const store = createStore(reducer, applyMiddleware(thunk));

const RouterComponent = () => (
  <Router>
    <div>
      <ul>
        <li>
          <NavLink
            exact
            activeStyle={{ textDecoration: 'none', color: 'black' }}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ textDecoration: 'none', color: 'black' }}
            to="/clients"
          >
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ textDecoration: 'none', color: 'black' }}
            to="/products"
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ textDecoration: 'none', color: 'black' }}
            to="/professionals"
          >
            Professionals
          </NavLink>
        </li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route path="/clients" component={Clients} />
      <Route path="/products" component={Products} />
      <Route path="/professionals" component={Professionals} />
    </div>
  </Router>
);

export default () => (
  <Provider store={store}>
    <RouterComponent />
  </Provider>
);
