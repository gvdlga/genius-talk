import { NextApiRequest, NextApiResponse } from 'next';
import Agent from '@/lib/models/Agent';
import dbConnect from '@/lib/dbConnect';
import { validateToken } from '@better-auth/server-side-library';
import bcryptjs from 'bcryptjs';

export function auth(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // First, try to validate as a user token
      const user = await validateToken(token);
      (req as any).user = user;
      return handler(req, res);
    } catch (error) {
      // If user token validation fails, try to find an agent
      try {
        const isValidAgentToken = await validateToken(token);
        if (isValidAgentToken) {
          await dbConnect();
          const betterAuthTokenHash = await bcryptjs.hash(token, 10);
          const agent = await Agent.findOne({ betterAuthTokenHash });

          if (agent) {
            (req as any).agent = agent;
            return handler(req, res);
          }
        }
      } catch (agentError) {
        // Suppress agent auth errors and fall through to the final unauthorized error
      }

      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}