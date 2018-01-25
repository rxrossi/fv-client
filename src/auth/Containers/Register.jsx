import React from 'react';
import { register } from '../actions';
import Generic from './Generic';

export default () => (
  <Generic
    submit={register}
    registering
  />
);
