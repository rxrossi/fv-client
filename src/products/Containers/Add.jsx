import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import createHOC from '../../HOC/Create';

const { asyncActions, createFormFieldActions } = reusableReduxConfig(urls.PRODUCTS, 'products');
const formActions = createFormFieldActions;

const Add = createHOC(Form);

const mapState = state => ({
  fieldValues: state.products.formFields.create,
  errors: state.products.APIStatus.post.errors,
});

export default connect(mapState, {
  submit: asyncActions.post,
  changeField: formActions.changeField,
  clearFields: formActions.clear,
})(Add);
