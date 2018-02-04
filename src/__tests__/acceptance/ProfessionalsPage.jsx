import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App from '../../App';
import * as API_URLS from '../../APIInfo';
import FormComponent from '../../professionals/Components/Form';
import ListComponent from '../../professionals/Components/List';

// Configure Enzyme
configure({ adapter: new Adapter() });

describe('Professionals Page', () => {
  describe('With professionals', () => {
    let sut;

    const professionalsListExample = [
      { id: '1', name: 'Mary' },
      { id: '2', name: 'Carl' },
    ];

    beforeEach((done) => {
      fetchMock.get(API_URLS.PROFESSIONALS, {
        body: {
          statusCode: 200,
          body: professionalsListExample,
        },
      });
      sut = mount(<App />);
      sut.find('a[href="/professionals"]').simulate('click', { button: 0 });
      setImmediate(() => done());
    });

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('renders the expected components', () => {
      sut.update();
      const ListMounted = sut.find(ListComponent);
      expect(ListMounted.length).toBe(1);
      expect(ListMounted.props().entities).toEqual(professionalsListExample);
      expect(sut.find(FormComponent).length).toBe(1);
    });
  });
});
