/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import ClientAddComponent from '../src/clients/Components/Add';
import ClientViewComponent from '../src/clients/Components/View';
import ProductsViewComponent from '../src/products/Components/View';
import ProductsViewOneComponent from '../src/products/Components/ViewOne';
import ProductsAddComponent from '../src/products/Components/Add';
import ProfessionalsAddComponent from '../src/professionals/Components/Add';
import ProfessionalsViewComponent from '../src/professionals/Components/View';
import PurchasesAddComponent from '../src/purchases/Components/Add';
import PurchasesViewComponent from '../src/purchases/Components/View';
import PurchasesViewOneComponent from '../src/purchases/Components/ViewOne';
import SalesAddComponent from '../src/sales/Components/Add';
import SalesViewComponent from '../src/sales/Components/View';
import SalesViewOneComponent from '../src/sales/Components/ViewOne';
import NavBar from '../src/NavBar';
import Wrapper from '../src/DateTimePicker/sharedComponents/Wrapper';
import ClockView from '../src/DateTimePicker/TimePicker/Components/ClockView';
import HoursPicker from '../src/DateTimePicker/TimePicker/Components/HoursPicker';
import MinutesPicker from '../src/DateTimePicker/TimePicker/Components/MinutesPicker';
import TimePicker from '../src/DateTimePicker/TimePicker';
import DaysComponent from '../src/DateTimePicker/DatePicker/Components/Days';
import DatePickerHeader from '../src/DateTimePicker/DatePicker/Components/Header';
import Toggler from '../src/DateTimePicker/Toggler/';
import DatePicker from '../src/DateTimePicker/DatePicker/';
import getDays from '../src/DateTimePicker/helpers/getDays';
import DateTimePicker from '../src/DateTimePicker/';

const dummyFn = () => {};

storiesOf('DateTimePicker/index', module)
  .add('default', () => {
    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          date: new Date(),
        };
        this.onChange = this.onChange.bind(this);
      }
      onChange(date) {
        this.setState({ date });
      }
      render() {
        return (
          <div>
            {this.state.date.toString()}
            <DateTimePicker date={this.state.date} onChange={this.onChange} />
          </div>);
      }
    }

    return (<TestComponent />);
  });
storiesOf('DateTimePicker/DatePicker/index')
  .add('2017 12 30 ', () =>
    <DatePicker date={new Date(2017, 11, 30)} onChange={v => console.log(v)} />);

storiesOf('DateTimePicker/Toggler', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('Toggler Clock 2017 12 30 09:05', () => {
    const date = new Date(2017, 11, 30, 9, 5);
    return <Toggler date={date} show="clock" handleClick={() => {}} />;
  })
  .add('Toggler Date 2017 12 30 09:05', () => {
    const date = new Date(2017, 11, 30, 9, 5);
    return <Toggler date={date} show="date" handleClick={() => {}} />;
  });

storiesOf('DateTimePicker/DatePicker/Components/With Wrapper decorator', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('DaysComponent for December 2017, selected 2017-12-06', () => {
    const days = getDays(11, 2017);
    return <DaysComponent days={days} selectedDay={days[10]} viewMonth={11} />;
  })
  .add('Header December 2017', () =>
    <DatePickerHeader viewMonth={11} viewYear={2017} handleClick={() => {}} />);

storiesOf('DateTimePicker/DatePicker/Components/Without Wrapper decorator', module)
  .add('Just the Wrapper', () => <Wrapper />)
  .add('Days with DatePickerHeader on Wrapper', () => {
    const days = getDays(11, 2017);
    return (
      <Wrapper>
        <DatePickerHeader viewMonth={11} viewYear={2017} handleClick={() => {}} />
        <DaysComponent days={days} selectedDay={days[10]} viewMonth={11} />
      </Wrapper>
    );
  });

storiesOf('DateTimePicker/TimePicker/index', module)
  .add('at 10:05', () => <TimePicker time="10:05" onChange={value => console.log(value)} />);

storiesOf('DateTimePicker/TimePicker/Components', module)
  .add('Just the Wrapper', () => <Wrapper />)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('Clock View', () =>
    (<ClockView
      time="09:31"
      hoursHandleClick={dummyFn}
      minutesHandleClick={dummyFn}
    />))
  .add('HoursPicker View', () => <HoursPicker />)
  .add('MinutesPicker View', () => <MinutesPicker />);

storiesOf('Sales/Add', module)
  .add('clean state', () =>
    (<SalesAddComponent
      handleSubmit={dummyFn}
      handleChange={dummyFn}
      removeField={dummyFn}
      addField={dummyFn}
      values={{}}
      errors={{}}
      clients={[
        { id: '1', name: 'John', phone: '9 9999 9898' },
        { id: '2', name: 'Mary', phone: '9 1111 2222' },
      ]}
      professionals={[
        { id: '1', name: 'Pro1' },
        { id: '2', name: 'Pro2' },
      ]}
      paymentOptions={[
        'Money', 'Debit', '1x', '2x', '3x',
      ]}
    />))
  .add('with two product fields', () =>
    (<SalesAddComponent
      handleSubmit={dummyFn}
      handleChange={dummyFn}
      removeField={dummyFn}
      addField={dummyFn}
      productsForSelect={[
          { id: '1', name: 'Ox', measure_unit: 'ml' },
          { id: '2', name: 'Shampoo', measure_unit: 'ml' },
        ]}
      values={{
          products: [{}, {}],
        }}
      errors={{}}
      clients={[
          { id: '1', name: 'John', phone: '9 9999 9898' },
          { id: '2', name: 'Mary', phone: '9 1111 2222' },
        ]}
      professionals={[
          { id: '1', name: 'Pro1' },
          { id: '2', name: 'Pro2' },
        ]}
      paymentOptions={[
          'Money', 'Debit', '1x', '2x', '3x',
        ]}
    />));

const sale1 = {
  id: 's1',
  name: 'service one',
  client: {
    id: 'c1',
    name: 'Ana',
  },
  professional: {
    id: 'p1',
    name: 'ProOne',
  },
  start_time: new Date(2017, 11, 30, 10, 0),
  end_time: new Date(2017, 11, 30, 16, 0),
  time_spent: '4:00',
  profit_per_hour: 39.17,
  payment: {
    value_total: 300,
    value_liquid: 300,
    discount: 'none',
    method: 'money',
    available_at: Date.now(),
  },
  stockEntries: [
    { id: '1', qty: 10, product: { name: 'OX' } },
    { id: '2', qty: 20, product: { name: 'Shampoo' } },
  ],
  profit: 200,
};
const sale2 = {
  ...sale1,
  name: 'service two',
  id: 's2',
  profit: 1000,
  stockEntries: [],
};

const sales = [sale1, sale2];

storiesOf('Sales/ViewOne', module)
  .add('clean state', () => <SalesViewOneComponent />)
  .add('with a valid sale', () => <SalesViewOneComponent sale={sale1} />)
  .add('with a valid sale without products', () => <SalesViewOneComponent sale={sale2} />);

storiesOf('Sales/View', module)
  .addDecorator(story => (
    <Router>
      {story()}
    </Router>
  ))
  .add('clean state', () => <SalesViewComponent />)
  .add('with sales', () =>
    (<SalesViewComponent
      sales={sales}
    />));

storiesOf('Purchases/Add', module)
  .add('clean state', () =>
    (<PurchasesAddComponent
      handleSubmit={dummyFn}
      handleChange={dummyFn}
      values={{}}
      errors={{}}
    />))
  .add('with a empty product', () =>
    (<PurchasesAddComponent
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
      handleSubmit={dummyFn}
      handleChange={dummyFn}
      values={{
          products: [{}, {}],
        }}
      errors={{}}
    />));

const purchaseEx = {
  stockEntries: [
    {
      id: '1', product: { id: '1', name: 'Product 1' }, qty: 2, price: 20,
    },
    {
      id: '2', product: { id: '2', name: 'Product 2' }, qty: 2, price: 20,
    },
  ],
  seller: 'Company one',
  date: '2017-10-10T00:00:00.000Z',
  id: '1',
  price: '90',
};

const purchaseEx2 = {
  stockEntries: [
    {
      id: '1', product: { id: '1', name: 'Product 1' }, qty: 2, price: 20,
    },
    {
      id: '2', product: { id: '2', name: 'Product 2' }, qty: 2, price: 20,
    },
  ],
  seller: 'Company Two',
  date: '2017-10-10T00:00:00.000Z',
  id: '2',
  price: '70',
};

storiesOf('Purchases/View', module)
  .addDecorator(story => (
    <Router>
      {story()}
    </Router>
  ))
  .add('clean state', () => <PurchasesViewComponent purchases={[]} />)
  .add('with a purchase to list', () =>
    (<PurchasesViewComponent purchases={[purchaseEx, purchaseEx2]} />));

storiesOf('Purchases/ViewOne', module)
  .add('empyt data', () => <PurchasesViewOneComponent />)
  .add('with a purchase', () => <PurchasesViewOneComponent purchase={purchaseEx} />);

storiesOf('Professionals/Add', module)
  .add('clean state', () =>
    (<ProfessionalsAddComponent
      handleSubmit={dummyFn}
      handleChange={dummyFn}
      values={{}}
      errors={{}}
    />))
  .add('with errors', () =>
    (<ProfessionalsAddComponent
      handleSubmit={dummyFn}
      handleChange={dummyFn}
      values={{
          name: 'John',
        }}
      errors={{
          name: 'NOT_UNIQUE',
        }}
    />));

storiesOf('Professionals/View', module)
  .add('clean state', () => <ProfessionalsViewComponent />)
  .add('with professionals', () =>
    (<ProfessionalsViewComponent professionals={[
      { id: '1', name: 'Mary' },
      { id: '2', name: 'Carl' },
    ]}
    />));

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
  .add('with products', () => (
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
