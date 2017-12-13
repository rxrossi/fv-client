/**/
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import ProductsView from '../src/products/Components/View';
import ProductsAdd from '../src/products/Components/Add';

storiesOf('Products View', module)
  .add('No products', () => <ProductsView />)
  .add('With products', () =>
    (<Router>
      <ProductsView
        products={[
        {
          id: '1',
          name: 'OX',
          measure_unit: 'ml',
          quantity: 850,
          price: 0.09, // per unit
          avgPriceFiveLast: 0.08, // per unit
        },
        {
          id: '2',
          name: 'Shampoo',
          measure_unit: 'ml',
          quantity: 1805,
          price: 0.01,
          avgPriceFiveLast: 0.02, // per unit
        },
        {
          id: '3',
          name: 'Capes',
          measure_unit: 'unit',
          quantity: 99,
          price: 1,
          avgPriceFiveLast: 1.2, // per unit
        },
      ]}
        baseUrl="/products"
      />
     </Router>));

storiesOf('Products Add', module)
  .add('No state yet', () => {
    const reducer = combineReducers({
      form: formReducer,
    });

    const store = createStore(reducer);

    const App = () => (
      <Provider store={store}>
        <ProductsAdd
          onSubmit={() => {}}
        />
      </Provider>
    );

    return <App />;
  })
  .add('With errors', () => {
    const reducer = combineReducers({
      form: formReducer,
    });

    const store = createStore(reducer);

    const App = () => (
      <Provider store={store}>
        <ProductsAdd
          onSubmit={() => {}}
          errors={{
            name: 'NOT_UNIQUE',
            measure_unit: 'BLANK',
          }}
        />
      </Provider>
    );

    return <App />;
  });
