import fetchMock from 'fetch-mock';
import { register } from './actions';
import * as URLS from '../APIInfo';

describe('Register user actions', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('calls the correct endpoint with data, receives true if ok', async () => {
    // Prepare
    const body = {
      email: 'user@mail.com',
      password: 'passw',
    };

    fetchMock.post(URLS.USERS, {
      body: {
        code: 200,
      },
    }, {
      name: 'register',
    });

    // Act
    const response = await register(body);
    // Assert
    expect(response).toBe(true);
    expect(fetchMock.calls('register').length).toBe(1);
  });

  it('calls the correct endpoint with data, receives false if not ok', async () => {
    // Prepare
    const body = {
      email: 'user@mail.com',
      password: 'passw',
    };

    fetchMock.post(URLS.USERS, {
      body: {
        code: 422,
      },
    }, {
      name: 'register',
    });

    // Act
    const response = await register(body);
    // Assert
    expect(response).toBe(false);
    expect(fetchMock.calls('register').length).toBe(1);
  });
});
