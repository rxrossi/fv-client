import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import EditHOC from '../../HOC/Edit';

const RedirectComponent = () => <Redirect to="/purchases" />;

const passProps = [
  'products',
];

const callPropsOnMount = [
  'fetchProducts',
];

const transform = (purchase) => {
  if (!purchase) {
    return purchase;
  }
  function transformEntries(entries) {
    return entries.map(entry => ({
      id: entry.product.id,
      qty: entry.qty,
      total_price: entry.qty * entry.price_per_unit,
    }));
  }
  return {
    ...purchase,
    products: transformEntries(purchase.stockEntries),
  };
};

const Edit = EditHOC(Form, RedirectComponent, passProps, callPropsOnMount, transform);

const { asyncActions, updateFormFieldActions } = reusableReduxConfig(urls.PURCHASES, 'purchases');
const formActions = updateFormFieldActions;
const { asyncActions: productsAsyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products');

const mapDispatch = {
  fetchProducts: productsAsyncActions.get,
  submit: asyncActions.put,
  fetchEntities: asyncActions.get,
  setFields: formActions.set,
  removeField: updateFormFieldActions.removeField,
  appendField: updateFormFieldActions.appendField,
  changeField: updateFormFieldActions.changeField,
  clearFields: updateFormFieldActions.clear,
};

const mapState = state => ({
  products: state.products.entities,
  errors: state.purchases.APIStatus.put.errors,
  fieldValues: state.purchases.formFields.update,
  entities: state.purchases.entities,
});

export { Edit };

export default connect(mapState, mapDispatch)(Edit);
