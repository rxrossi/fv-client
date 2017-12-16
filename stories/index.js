/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import ClientAddComponent from '../src/clients/Components/Add';
import ClientViewComponent from '../src/clients/Components/View';
import ProductsViewComponent from '../src/products/Components/View';
import ProductsViewOneComponent from '../src/products/Components/ViewOne';
import ProductsAddComponent from '../src/products/Components/Add';
import NavBar from '../src/NavBar';

storiesOf('NavBar', module)
  .addDecorator(story => (
    <Router>
      {story()}
    </Router>
  ))
  .add('basic', () => <NavBar />);

storiesOf('Products/Add', module)
  .addDecorator(story => (
    <Router>
      {story()}
    </Router>
  ))
  .add('clean state', () => (
    <ProductsAddComponent
      handleSubmit={() => {}}
      handleChange={() => {}}
    />
  ))
  .add('with errors', () => (
    <ProductsAddComponent
      handleSubmit={() => {}}
      handleChange={() => {}}
      values={{
        name: 'OX',
      }}
      errors={{
        name: 'NOT_UNIQUE',
        phone: 'BLANK',
      }}
    />
  ));

storiesOf('Products/View', module)
  .addDecorator(story => (
    <Router>
      {story()}
    </Router>
  ))
  .add('clean state', () => <ProductsViewComponent />)
  .add('with clients', () => (
    <ProductsViewComponent
      products={[
          {
            id: '1',
            name: 'OX',
            measure_unit: 'ml',
            quantity: 850,
            price_per_unit: 0.09,
            avgPriceFiveLast: 0.08, // per unit
          },
          {
            id: '2',
            name: 'Shampoo',
            measure_unit: 'ml',
            quantity: 1805,
            price_per_unit: 0.01,
            avgPriceFiveLast: 0.02, // per unit
          },
          {
            id: '3',
            name: 'Capes',
            measure_unit: 'unit',
            quantity: 99,
            price_per_unit: 1,
            avgPriceFiveLast: 1.2, // per unit
          },
        ]}
    />));

storiesOf('Products/View One', module)
  .addDecorator(story => (
    <Router>
      {story()}
    </Router>
  ))
  .add('no stock entries', () => (
    <ProductsViewOneComponent
      product={{
        id: '1',
        name: 'Ox 30v',
        measure_unit: 'ml',
        quantity: 0,
        price_per_unit: undefined,
        avgPriceFiveLast: undefined,
        stock: [],
      }}
    />
  ))
  .add('with stock entries', () => (
    <ProductsViewOneComponent
      product={{
        id: '1',
        name: 'Ox 30v',
        measure_unit: 'ml',
        quantity: '100',
        price_per_unit: '5',
        avgPriceFiveLast: '6',
        stock: [
          {
            qty: 10,
            price: 6,
            id: '5',
            sale: 'someId',
            sourceOrDestination: {
              name: 'Client X, to do Y',
            },
            price_per_unit: '5',
            date: '2017-12-10T00:00:00.000Z',
          },
          {
            qty: 10,
            price: 6,
            id: '4',
            purchase: 'someId',
            sourceOrDestination: {
              seller: 'Company two',
            },
            price_per_unit: '5',
            date: '2017-12-10T00:00:00.000Z',
          },
          {
            qty: 10,
            price: 6,
            id: '3',
            purchase: 'someId',
            sourceOrDestination: {
              seller: 'Company two',
            },
            price_per_unit: '5',
            date: '2017-12-10T00:00:00.000Z',
          },
          {
            qty: 10,
            price: 6,
            id: '2',
            purchase: 'someId',
            sourceOrDestination: {
              seller: 'Company two',
            },
            price_per_unit: '5',
            date: '2017-12-10T00:00:00.000Z',
          },
          {
            qty: 10,
            price: 6,
            id: '1',
            purchase: 'someId',
            sourceOrDestination: {
              seller: 'Company two',
            },
            price_per_unit: '5',
            date: '2017-12-10T00:00:00.000Z',
          },
        ],
      }}
    />
  ));

storiesOf('Clients/View', module)
  .add('clean state', () => <ClientViewComponent />)
  .add('with clients', () => (
    <ClientViewComponent
      clients={[
        { id: '1', name: 'Mary', phone: '999' },
        { id: '2', name: 'Carl', phone: '888' },
      ]}
    />));

storiesOf('Clients/Add', module)
  .add('with errors', () => (
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
    />))
  .add('clean state', () => (
    <ClientAddComponent
      values={{}}
      errors={{}}
      handleSubmit={() => {}}
      handleChange={() => {}}
    />));

storiesOf('Clients/Full', module)
  .add('clean state', () => (
    <div>
      <ClientAddComponent
        values={{}}
        errors={{}}
        handleSubmit={() => {}}
        handleChange={() => {}}
      />
      <ClientViewComponent
        clients={[
          { id: '1', name: 'Mary', phone: '999' },
          { id: '2', name: 'Carl', phone: '888' },
        ]}
      />
    </div>));

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
