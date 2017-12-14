/*eslint-disable*/
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import ClientAddComponent from '../src/clients/Components/Add';
import ClientViewComponent from '../src/clients/Components/View';


storiesOf('Clients', module)
  .add('View Clean state', () =>
    <ClientViewComponent />
  )
  .add('View With clients', () =>
    <ClientViewComponent
      clients={[
        { id: '1', name: 'Mary', phone: '999'},
        { id: '2', name: 'Carl', phone: '888'},
      ]}
    />
  )
  .add('Add Clean state', () =>
    <ClientAddComponent
      values={{}}
      errors={{}}
      handleSubmit={() => {}}
      handleChange={() => {}}
    />
  ).add('Add With errors', () =>
    <ClientAddComponent
      values={{
        name: 'John',
      }}
      errors={{
        name: 'NOT_UNIQUE',
        phone: 'BLANK',
      }}
      handleSubmit={() => {}}
      handleChange={() => {}}
    />
  )

// storiesOf('Products View', module)
//   .add('No products', () => <ProductsView />)
//   .add('With products', () =>
//     (<Router>
//       <ProductsView
//         products={[
//         {
//           id: '1',
//           name: 'OX',
//           measure_unit: 'ml',
//           quantity: 850,
//           price: 0.09, // per unit
//           avgPriceFiveLast: 0.08, // per unit
//         },
//         {
//           id: '2',
//           name: 'Shampoo',
//           measure_unit: 'ml',
//           quantity: 1805,
//           price: 0.01,
//           avgPriceFiveLast: 0.02, // per unit
//         },
//         {
//           id: '3',
//           name: 'Capes',
//           measure_unit: 'unit',
//           quantity: 99,
//           price: 1,
//           avgPriceFiveLast: 1.2, // per unit
//         },
//       ]}
//         baseUrl="/products"
//       />
//      </Router>));

// storiesOf('Products Add', module)
//   .add('No state yet', () => {
//     const reducer = combineReducers({
//       form: formReducer,
//     });

//     const store = createStore(reducer);

//     const App = () => (
//       <Provider store={store}>
//         <ProductsAdd
//           onSubmit={() => {}}
//         />
//       </Provider>
//     );

//     return <App />;
//   })
//   .add('With errors', () => {
//     const reducer = combineReducers({
//       form: formReducer,
//     });

//     const store = createStore(reducer);

//     const App = () => (
//       <Provider store={store}>
//         <ProductsAdd
//           onSubmit={() => {}}
//           errors={{
//             name: 'NOT_UNIQUE',
//             measure_unit: 'BLANK',
//           }}
//         />
//       </Provider>
//     );

//     return <App />;
//   });
