import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import DateTimePicker from './index';
// Configure Enzyme
configure({ adapter: new Adapter() });

function mountContainer(date, onChange = (() => () => {})) {
  return mount(<DateTimePicker
    date={date}
    onChange={onChange}
    name="Date"
    label="Date"
  />);
}

describe('DateTimePicker Component', () => {
  it('mounts', () => {
    mountContainer();
  });
});
