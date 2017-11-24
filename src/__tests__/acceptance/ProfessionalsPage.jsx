import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { configure, mount } from 'enzyme';
import App, { store } from '../../App';
import * as API_URLS from '../../APIInfo';
import { NO_PROFESSIONALS_P_CLASS } from '../../professionals/Components/View';
// Configure Enzyme

// const NO_PROFESSIONALS_P_CLASS = 'no-professionals-msg';

configure({ adapter: new Adapter() });
describe('Professionals Page', () => {
  describe('No professionals yet', () => {
    let sut;

    beforeEach((done) => {
      fetchMock.get(API_URLS.PROFESSIONALS, {
        body: {
          code: 200,
          body: [],
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

    it('renders', () => {
      expect(sut.length).toBe(1);
    });

    it('has a form', () => {
      const form = sut.find('form');
      expect(form.length).toBe(1);
    });

    it('displays the no professionals warning', () => {
      expect(sut.find(`.${NO_PROFESSIONALS_P_CLASS}`).length).toBe(1);
    });
  });

  describe('With professionals', () => {
    let sut;

    const professionalsListExample = [
      { id: '1', name: 'Mary' },
      { id: '2', name: 'Carl' },
    ];

    beforeEach((done) => {
      fetchMock.get(API_URLS.PROFESSIONALS, {
        body: {
          code: 200,
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

    it('renders', () => {
      expect(sut.length).toBe(1);
    });

    it('has a form', () => {
      const form = sut.find('form');
      expect(form.length).toBe(1);
    });

    it('displays the no professionals warning', () => {
      expect(sut.text()).toMatch(professionalsListExample[0].name);
    });
  });
  describe('Adding professionals', () => {
    describe('Success case', () => {
      let sut;

      const carl = { name: 'Carl' };

      beforeEach((done) => {
        fetchMock.get(API_URLS.PROFESSIONALS, {
          body: {
            code: 200,
            body: [],
          },
        });

        fetchMock.post((url, opts) => (
          url === API_URLS.PROFESSIONALS
          && opts
          && opts.body === JSON.stringify(carl)
        ), {
          body: {
            code: 201,
            body: {
              id: '10',
              ...carl,
            },
          },
        });

        sut = mount(<App />);
        sut.find('a[href="/professionals"]').simulate('click', { button: 0 });
        setImmediate(() => done());
      });

      it('does not show Carl', () => {
        expect(sut.text()).not.toMatch(carl.name);
      });

      describe('changing the inputs, and submitting', () => {
        beforeEach((done) => {
          // Prepare
          const nameIpnt = sut.find('input[name="name"]');
          nameIpnt.simulate('change', { target: { value: carl.name } });

          // Act
          sut.find('form').simulate('submit');
          setImmediate(() => done());
        });

        it('shows the recently user (Carl)', () => {
          // Assert
          expect(sut.text()).toMatch(carl.name);
        });
      });
    });
  });
});
