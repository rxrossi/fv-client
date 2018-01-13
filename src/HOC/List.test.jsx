import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import listHOC from './List';
// Configure Enzyme
configure({ adapter: new Adapter() });

const SomePresentational = () => (
  <p>Presentational component</p>
);

function mountComponent({
  fetchEntities,
  entities,
} = {}) {
  const fakeFn = () => {};
  const List = listHOC(SomePresentational);

  return mount(<List
    fetchEntities={fetchEntities || fakeFn}
    entities={entities || []}
  />);
}

describe('List HOC', () => {
  it('mounts and has the presentational component', () => {
    // Prepare
    // Act
    const sut = mountComponent();
    // Assert
    expect(sut.find(SomePresentational).length).toBe(1);
  });

  it('calls fetchEntities on mount', () => {
    // Prepare
    const fetchEntities = jest.fn();
    // Act
    mountComponent({ fetchEntities });
    // Assert
    expect(fetchEntities).toHaveBeenCalledTimes(1);
  });
});
