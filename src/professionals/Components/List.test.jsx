import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import List from './List';
// Configure Enzyme
configure({ adapter: new Adapter() });

const mountComponent = ({ professionals } = {}) => {
  const store = createStore(() => ({}));
  const App = () => (
    <Provider store={store}>
      <Router>
        <List
          entities={professionals || []}
        />
      </Router>
    </Provider>
  );

  return mount(<App />);
};

describe('Component view', () => {
  describe('No professionals yet', () => {
    it('shows a message saying that no professionals are registered', () => {
      // Prepare
      const sut = mountComponent();
      // Assert
      expect(sut.text()).toMatch('No professionals yet, register some');
    });
  });

  describe('With professionals', () => {
    const professionals = [
      { id: '1', name: 'Mary' },
      { id: '2', name: 'Carl' },
    ];

    it('renders both professionals', () => {
      // Prepare
      const sut = mountComponent({ professionals });
      // Assert
      expect(sut.text()).toMatch(professionals[0].name);
      expect(sut.text()).toMatch(professionals[1].name);
    });
  });
});
