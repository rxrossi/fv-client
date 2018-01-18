import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import EditHOC from '../../HOC/Edit';

const RedirectComponent = () => <Redirect to="/sales" />;

const passProps = [
  'products',
  'clients',
  'professionals',
  'paymentOptions',
];

const callPropsOnMount = [
  'fetchClients',
  'fetchProducts',
  'fetchProfessionals',
];

const paymentOptions = [
  { id: '1', name: 'Money' },
  { id: '2', name: 'Debit' },
  { id: '3', name: 'Credit 1x' },
  { id: '4', name: 'Credit 2x' },
  { id: '5', name: 'Credit 3x' },
];

const transform = (purchase) => {
  if (!purchase) {
    return purchase;
  }
  function transformEntries(entries) {
    return entries.map(entry => ({
      product: entry.product.id,
      qty: entry.qty,
    }));
  }
  return {
    ...purchase,
    client: purchase.client.id,
    professional: purchase.professional.id,
    value: purchase.payment.value_total,
    payment_method: purchase.payment.method,
    products: transformEntries(purchase.stockEntries),
  };
};

const Edit = EditHOC(Form, RedirectComponent, passProps, callPropsOnMount, transform);

const { asyncActions: professionalsAsyncActions } = reusableReduxConfig(urls.PROFESSIONALS, 'professionals');
const { asyncActions: productsAsyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products');
const { asyncActions: clientsAsyncActions } = reusableReduxConfig(urls.CLIENTS, 'clients');
const { asyncActions, updateFormFieldActions } = reusableReduxConfig(urls.SALES, 'sales');

const mapDispatch = {
  fetchProducts: productsAsyncActions.get,
  fetchClients: clientsAsyncActions.get,
  fetchProfessionals: professionalsAsyncActions.get,
  submit: asyncActions.put,
  fetchEntities: asyncActions.get,
  setFields: updateFormFieldActions.set,
  removeField: updateFormFieldActions.removeField,
  appendField: updateFormFieldActions.appendField,
  changeField: updateFormFieldActions.changeField,
  clearFields: updateFormFieldActions.clear,
};

const mapState = state => ({
  products: state.products.entities,
  clients: state.clients.entities,
  professionals: state.professionals.entities,
  errors: state.sales.APIStatus.put.errors,
  fieldValues: state.sales.formFields.update,
  entities: state.sales.entities,
  paymentOptions,
});

export { Edit };

export default connect(mapState, mapDispatch)(Edit);
