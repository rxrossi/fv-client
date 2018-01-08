import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import App from '../../App';
import { Add } from '../../clients/Containers/Add';
import List from '../../clients/Containers/List';


// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Clients acceptance test', () => {
  let sut;
  beforeEach((done) => {
    sut = mount(<App />);
    sut.find('a[href="/clients"]').simulate('click', { button: 0 });
    setImmediate(() => done());
  });

  it('loads the correct components', () => {
    expect(sut.find(List).length).toBe(1);
    expect(sut.find(Add).length).toBe(1);
  });
});
