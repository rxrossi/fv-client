import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import createHOC from '../../HOC/Create';
import { headerCreator } from '../../auth/actions';

const passProps = [
  'products',
];

const callPropsOnMount = [
  'fetchProducts',
];

const AddContainer = createHOC(Form, passProps, callPropsOnMount);

const { asyncActions, createFormFieldActions } = reusableReduxConfig(urls.PURCHASES, 'purchases', headerCreator);

const { asyncActions: productsAsyncActions } = reusableReduxConfig(urls.PRODUCTS, 'products');

const mapState = state => ({
  products: state.products.entities,
  errors: state.purchases.APIStatus.post.errors,
  fieldValues: state.purchases.formFields.create,
});

const mapDispatch = {
  fetchProducts: productsAsyncActions.get,
  submit: asyncActions.post,
  removeField: createFormFieldActions.removeField,
  appendField: createFormFieldActions.appendField,
  changeField: createFormFieldActions.changeField,
  clearFields: createFormFieldActions.clear,
};

export default connect(mapState, mapDispatch)(AddContainer);
