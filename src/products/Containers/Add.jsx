import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import createHOC from '../../HOC/Create';
import { headerCreator } from '../../auth/actions';

const { asyncActions, createFormFieldActions } = reusableReduxConfig(urls.PRODUCTS, 'products', headerCreator);
const formActions = createFormFieldActions;

const AddContainer = createHOC(Form);

const mapState = state => ({
  fieldValues: state.products.formFields.create,
  errors: state.products.APIStatus.post.errors,
});

export default connect(mapState, {
  submit: asyncActions.post,
  changeField: formActions.changeField,
  clearFields: formActions.clear,
})(AddContainer);
