import { createMocks } from 'node-mocks-http';
import { auth } from '@/lib/auth';
import { validateToken } from 'better-auth';
import Agent from '@/lib/models/Agent';
import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';

jest.mock('better-auth');
jest.mock('@/lib/models/Agent');
jest.mock('bcryptjs');
jest.mock('@/lib/dbConnect');

describe('auth middleware', () => {
  const mockHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the handler if user token is valid', async () => {
    const { req, res } = createMocks({
      headers: {
        authorization: 'Bearer valid-user-token',
      },
    });

    (validateToken as jest.Mock).mockResolvedValueOnce({ id: 'user-123' });

    await auth(mockHandler)(req, res);

    expect(mockHandler).toHaveBeenCalled();
    expect((req as any).user).toEqual({ id: 'user-123' });
  });

  it('should call the handler if agent token is valid', async () => {
    const { req, res } = createMocks({
      headers: {
        authorization: 'Bearer valid-agent-token',
      },
    });

    (validateToken as jest.Mock).mockRejectedValueOnce(new Error('User token invalid'));
    (validateToken as jest.Mock).mockResolvedValueOnce(true);
    (Agent.find as jest.Mock).mockResolvedValue([
      { betterAuthTokenHash: 'hashed-token-1' },
      { betterAuthTokenHash: 'hashed-token-2', id: 'agent-456' }, // This is the agent we expect to find
    ]);
    (bcryptjs.compare as jest.Mock).mockImplementation((token, hash) => {
      if (token === 'valid-agent-token' && hash === 'hashed-token-2') {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    });

    await auth(mockHandler)(req, res);

    expect(mockHandler).toHaveBeenCalled();
    expect((req as any).agent).toEqual({ id: 'agent-456', betterAuthTokenHash: 'hashed-token-2' });
  });

  it('should return 401 if no auth header is present', async () => {
    const { req, res } = createMocks({});

    await auth(mockHandler)(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it('should return 401 if token is invalid', async () => {
    const { req, res } = createMocks({
      headers: {
        authorization: 'Bearer invalid-token',
      },
    });

    (validateToken as jest.Mock).mockRejectedValue(new Error('Invalid token'));

    await auth(mockHandler)(req, res);

    expect(res._getStatusCode()).toBe(401);
  });
});