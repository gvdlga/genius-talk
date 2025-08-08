
import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/auth/callback';
import { useStore } from '../store';

// Mock jwt-decode
jest.mock('jwt-decode', () => ({
  jwtDecode: (token: string) => {
    if (token === 'test-token') {
      return { sub: '123', name: 'Test User' };
    }
    throw new Error('Invalid token');
  },
}));

describe('/api/auth/callback', () => {
  it('should set cookie, redirect and set session on valid token', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        token: 'test-token',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(302); // Redirect status code
    expect(res._getRedirectUrl()).toBe('/');
    expect(res._getHeaders()['set-cookie']).toContain('betterauth_token=test-token; HttpOnly; Path=/; Max-Age=3600');

    const { userId, userName } = useStore.getState();
    expect(userId).toBe('123');
    expect(userName).toBe('Test User');
  });

  it('should return 400 on missing token', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Invalid token' });
  });

  it('should return 400 on invalid token', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        token: 'invalid-token',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Invalid token' });
  });
});
