
import { NextApiRequest, NextApiResponse } from 'next';
import { jwtDecode } from 'jwt-decode';
import { useStore } from '../../../store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token' });
  }

  // In a real application, you would validate the token with BetterAuth
  // For this example, we'll assume the token is valid
  try {
    const decoded: { sub: string; name: string } = jwtDecode(token);
    useStore.getState().setSession(decoded.sub, decoded.name);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  res.setHeader('Set-Cookie', `betterauth_token=${token}; HttpOnly; Path=/; Max-Age=3600`);
  res.redirect('/');
}
