import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FieldArray } from 'redux-form';

// eslint-disable-next-line
const ProductsFields = ({ fields, productsForSelect }) => (
  <div>
    <button
      type="button"
      name="add-product"
      onClick={() => fields.push({})}
    >
      Add Product
    </button>
    <ul>
      {fields.map((product, index) => (
        // eslint-disable-next-line
        <li key={index}>
          <button
            type="button"
            className="remove-product"
            onClick={() => fields.remove(index)}
          >
            Remove product
          </button>
          <Field type="text" name={`${product}.id`} component="select">
            <option>Select one</option>
            {
              productsForSelect.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Field>
          <Field component="input" type="number" name={`${product}.qty`} />
        </li>
      ))}
    </ul>
  </div>
);
ProductsFields.defaultProps = {
  productsForSelect: [],
};

const Add = ({
  handleSubmit, paymentOptions, clients, professionals, productsForSelect,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      component="input"
      type="text"
      name="name"
      placeholder="Name of the service"
    />

    <Field
      component="input"
      type="number"
      name="value"
      placeholder="Value"
    />

    <Field type="text" name="payment_method" component="select">
      <option>Select one</option>
      {
        paymentOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))
      }
    </Field>

    <Field component="input" type="date" name="date" />
    <Field component="input" type="time" name="start_time" />
    <Field component="input" type="time" name="end_time" />

    <Field type="text" name="client" component="select">
      <option>Select one</option>
      {
        clients.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))
      }
    </Field>


    <Field type="text" name="professional" component="select">
      <option>Select one</option>
      {
        professionals.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))
      }
    </Field>

    <FieldArray name="products" component={ProductsFields} productsForSelect={productsForSelect} />

    <button type="submit">Save</button>
  </form>
);

Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  paymentOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  professionals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  productsForSelect: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default reduxForm({
  form: 'sales add',
})(Add);

