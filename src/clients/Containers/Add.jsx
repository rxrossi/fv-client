import React from 'react';
import { reduxForm } from 'redux-form';
import 'isomorphic-fetch'; /* global fetch */
import Add from '../Components/Add';
import * as API_URLS from '../../APIInfo';

const AddReduxForm = reduxForm({
  form: 'addClients',
})(Add);

class AddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  // eslint-disable-next-line
  submit(values) {
    // TODO:
    // replace this with an action
    // create a sort of API, extracting it from actions
    fetch(API_URLS.CLIENTS, {
      method: 'POST',
      body: values,
    });
  }

  render() {
    return (
      <AddReduxForm onSubmit={this.submit} />
    );
  }
}

export default AddContainer;
