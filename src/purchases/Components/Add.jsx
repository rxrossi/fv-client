import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

/* eslint-disable */

const ProductsFields = ({ fields, productsForSelect }) => (
  <div>
    <button
      type="button"
      className="add-product"
      onClick={() => fields.push({})}>
      Add Product
    </button>
    <ul>
      {fields.map((product, index) => (
        <li key={index}>
          <button
            type="button"
            className="remove-product"
            onClick={() => fields.remove(index)}>
            Remove product
          </button>
          <Field type="text" name={`${product}.id`} component="select">
            <option>Select one</option>
            {
              productsForSelect.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))
            }
          </Field>
          <Field component="input" type="number" name={`${product}.qty`} />
          <Field component="input" type="number" name={`${product}.price`} placeholder="Value of each" />
        </li>
      ))}
    </ul>
  </div>
);
ProductsFields.defaultProps = {
  productsForSelect: [],
}

const Add = ({ productsForSelect, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field component="input" type="text" name="seller" />
    <Field component="input" type="text" name="date" />
    <FieldArray name="products" component={ProductsFields} productsForSelect={productsForSelect} />
  </form>
);

export default reduxForm({
  form: 'purchases add',
})(Add);