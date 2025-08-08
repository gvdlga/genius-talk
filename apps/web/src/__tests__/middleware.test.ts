
import { middleware } from '../middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


describe('Middleware', () => {
  beforeAll(() => {
    process.env.BETTERAUTH_LOGIN_URL = 'http://localhost:3000/api/auth/login';
  });

  it('should redirect to login if no token is present', () => {
    const req = { cookies: { get: () => undefined }, url: 'http://localhost:3000' } as unknown as NextRequest;
    const result = middleware(req);
    expect(result.status).toBe(307);
    expect(result.headers.get('location')).toBe(process.env.BETTERAUTH_LOGIN_URL);
  });

  it('should continue if a token is present', () => {
    const req = { cookies: { get: (name: string) => name === 'betterauth_token' ? 'sometoken' : undefined }, url: 'http://localhost:3000' } as unknown as NextRequest;
    const result = middleware(req);
    expect(result.status).toBe(200);
  });
});
