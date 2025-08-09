import { createMocks } from 'node-mocks-http';
import agentsApi from '@/pages/api/accounts/[accountId]/agents';
import dbConnect from '@/lib/dbConnect';
import Agent from '@/lib/models/Agent';
import bcryptjs from 'bcryptjs';

import { validateToken } from 'better-auth';
import { auth } from '@/lib/auth';

jest.mock('@/lib/dbConnect');
jest.mock('@/lib/models/Agent');
jest.mock('bcryptjs');

jest.mock('better-auth');

describe('/api/accounts/[accountId]/agents', () => {
  it('should return 405 if method is not POST', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await agentsApi(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it('should return 400 if request body is invalid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'test' },
    });

    await agentsApi(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should return 401 if betterAuthToken is invalid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: { accountId: 'test-account' },
      body: { name: 'test-agent', betterAuthToken: 'invalid-token' },
    });

    (auth.validateToken as jest.Mock).mockResolvedValue(false);

    await agentsApi(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it('should return 201 if agent is created successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: { accountId: 'test-account' },
      body: { name: 'test-agent', betterAuthToken: 'test-token' },
    });

    (auth.validateToken as jest.Mock).mockResolvedValue(true);
    (bcryptjs.hash as jest.Mock).mockResolvedValue('hashed-token');
    (Agent.create as jest.Mock).mockResolvedValue({ agentId: 'new-agent-id' });

    await agentsApi(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toHaveProperty('agentId', 'new-agent-id');
    expect(dbConnect).toHaveBeenCalled();
    expect(bcryptjs.hash).toHaveBeenCalledWith('test-token', 10);
    expect(Agent.create).toHaveBeenCalledWith({
      accountId: 'test-account',
      name: 'test-agent',
      betterAuthTokenHash: 'hashed-token',
    });
  });
});
