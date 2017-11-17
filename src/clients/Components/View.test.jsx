import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import View, { Client, NO_CLIENTS_P_CLASS } from './View';
// Configure Enzyme
configure({ adapter: new Adapter() });

const clientsListExample = [
  { id: '1', name: 'John', phone: '9 9999 9999' },
  { id: '2', name: 'Mary', phone: '9 8888 8888' },
];

const fakeFetch = jest.fn();

describe('Clients View component', () => {
  const SEL_NO_CLIENTS_MSG = `.${NO_CLIENTS_P_CLASS}`;

  it('displays a message saying that are no clients if they are not given', () => {
    const sut = shallow(<View fetchClients={fakeFetch} />);
    expect(sut.find(SEL_NO_CLIENTS_MSG).length).toBe(1);
  });

  it('calls fetch on mount', () => {
    fakeFetch.mockClear();
    shallow(<View fetchClients={fakeFetch} />);
    expect(fakeFetch).toHaveBeenCalledTimes(1);
  });

  it('renders one client if one is given', () => {
    const sut = shallow(<View fetchClients={fakeFetch} clients={clientsListExample.slice(0, 1)} />);

    expect(sut.find(SEL_NO_CLIENTS_MSG).length).toBe(0);
    expect(sut.find(Client).length).toBe(1);
  });

  it('renders one or more clients if one or more are given', () => {
    const sut = shallow(<View fetchClients={fakeFetch} clients={clientsListExample} />);

    expect(sut.find(SEL_NO_CLIENTS_MSG).length).toBe(0);
    expect(sut.find(Client).length).toBe(2);
  });
});

describe('Client (Single) component', () => {
  it('renders the name and phone', () => {
    const client = clientsListExample[0];
    const sut = shallow(<Client client={client} />);

    expect(sut.contains(client.name)).toBe(true);
    expect(sut.contains(client.phone)).toBe(true);
  });
});
