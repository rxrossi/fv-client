import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import createHOC from '../../HOC/Create';

const passProps = [
  'products',
  'clients',
  'professionals',
];

const Add = createHOC(Form, passProps);

const { asyncActions: professionalsAsyncActions } = reusableReduxConfig(urls.PROFESSIONALS, 'professionals');
const { asyncActions: productsAsyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products');
const { asyncActions: clientsAsyncActions } = reusableReduxConfig(urls.CLIENTS, 'clients');
const { asyncActions: salesAsyncActions, createFormFieldActions } = reusableReduxConfig(urls.SALES, 'sales');

const paymentOptions = [
  { id: '1', name: 'Money' },
  { id: '2', name: 'Debit' },
  { id: '3', name: 'Credit 1x' },
  { id: '4', name: 'Credit 2x' },
  { id: '5', name: 'Credit 3x' },
];

const mapState = state => ({
  products: state.products.entities,
  clients: state.clients.entities,
  professionals: state.professionals.entities,
  errors: state.sales.APIStatus.post.errors,
  fieldValues: state.sales.formFields.create,
  paymentOptions,
});


const mapDispatch = {
  fetchProducts: productsAsyncActions.get,
  fetchClients: clientsAsyncActions.get,
  fetchProfessionals: professionalsAsyncActions.get,
  submit: salesAsyncActions.post,
  removeField: createFormFieldActions.removeField,
  appendField: createFormFieldActions.appendField,
  changeField: createFormFieldActions.changeField,
  clearFields: createFormFieldActions.clear,
};

export default connect(mapState, mapDispatch)(Add);

