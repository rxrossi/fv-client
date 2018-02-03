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
        statusCode: 200,
      },
    }, {
      name: 'register',
    });

    // Act
    const response = await register(body);
    // Assert
    expect(response.errors).toBe(undefined);
    expect(fetchMock.calls('register').length).toBe(1);
  });

  it('calls the correct endpoint with data, receives false if not ok', async () => {
    // Prepare
    const body = {
      email: 'user@mail.com',
      password: 'passw',
    };

    const errors = {
      name: 'NOT_UNIQUE',
    };

    fetchMock.post(URLS.USERS, {
      body: {
        statusCode: 422,
        errors,
      },
    }, {
      name: 'register',
    });

    // Act
    const response = await register(body);
    // Assert
    expect(response).toEqual({ errors });
    expect(fetchMock.calls('register').length).toBe(1);
  });
});
