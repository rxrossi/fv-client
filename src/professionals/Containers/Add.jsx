import reusableReduxConfig from 'reusablecrudredux';
import { connect } from 'react-redux';
import Form from '../Components/Form';
import createHOC from '../../HOC/Create';
import * as urls from '../../APIInfo';

const { asyncActions, createFormFieldActions } = reusableReduxConfig(urls.PROFESSIONALS, 'professionals');
const formActions = createFormFieldActions;

const Add = createHOC(Form);

const mapState = state => ({
  fieldValues: state.professionals.formFields.create,
  errors: state.professionals.APIStatus.post.errors,
});

export default connect(mapState, {
  submit: asyncActions.post,
  changeField: formActions.changeField,
  clearFields: formActions.clear,
})(Add);
