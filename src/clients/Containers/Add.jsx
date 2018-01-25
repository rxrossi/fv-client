import { connect } from 'react-redux';
import reusableReduxConfig from 'reusablecrudredux';
import Form from '../Components/Form';
import * as urls from '../../APIInfo';
import createHOC from '../../HOC/Create';
import { headerCreator } from '../../auth/actions';

const { asyncActions, createFormFieldActions } = reusableReduxConfig(urls.CLIENTS, 'clients', headerCreator);
const formActions = createFormFieldActions;

const Add = createHOC(Form);

const mapState = state => ({
  fieldValues: state.clients.formFields.create,
  errors: state.clients.APIStatus.post.errors,
});

export { Add };

export default connect(mapState, {
  submit: asyncActions.post,
  changeField: formActions.changeField,
  clearFields: formActions.clear,
})(Add);
