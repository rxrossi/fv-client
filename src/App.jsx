import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reusableReduxConfig from 'reusablecrudredux';
import Clients from './clients/';
import Professionals from './professionals/';
import Products from './products';
import Purchases from './purchases';
import Sales from './sales';
import RegisterUser from './auth/Containers/Register';
import Login from './auth/Containers/Login';
import Logout from './auth/Containers/Logout';
import NavBar from './NavBar';
import authReducer from './auth/reducer';
import * as urls from './APIInfo';
/* global localStorage */

const Home = () => (
  <p> This is home </p>
);

export const reducer = combineReducers({
  clients: reusableReduxConfig(urls.CLIENTS, 'clients').reducer,
  professionals: reusableReduxConfig(urls.PROFESSIONALS, 'professionals').reducer,
  products: reusableReduxConfig(urls.PRODUCTS, 'products').reducer,
  purchases: reusableReduxConfig(urls.PURCHASES, 'purchases').reducer,
  sales: reusableReduxConfig(urls.SALES, 'sales').reducer,
  auth: authReducer,
});

export const store = createStore(reducer, { auth: { token: localStorage.getItem('token') } }, applyMiddleware(thunk));

const RouterComponent = ({ isLogged }) => (
  <Router>
    <div>
      <NavBar />
      {
        isLogged ? (
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Home} />
            <Route path="/logout" component={Logout} />
            <Route path="/clients/:id?/:action?" component={Clients} />
            <Route path="/products/:id?/:action?" component={Products} />
            <Route path="/professionals/:id?/:action?" component={Professionals} />
            <Route path="/purchases/:id?/:action?" component={Purchases} />
            <Route path="/sales/:id?/:action?" component={Sales} />
          </div>
        ) : (
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterUser} />
          </div>
        )
      }
    </div>
  </Router>
);

RouterComponent.propTypes = {
  isLogged: PropTypes.string,
};

RouterComponent.defaultProps = {
  isLogged: undefined,
};

const mapState = state => ({
  isLogged: state.auth.token,
});

const ConnectedRouterComponent = connect(mapState)(RouterComponent);

export default () => (
  <Provider store={store}>
    <ConnectedRouterComponent />
  </Provider>
);
