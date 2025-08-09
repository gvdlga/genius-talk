import { NextApiRequest, NextApiResponse } from 'next';
import Agent from '@/lib/models/Agent';
import dbConnect from '@/lib/dbConnect';
import { validateToken } from 'better-auth';
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
        // Validate the token with BetterAuth first
        await validateToken(token); // If this throws, it's not a valid BetterAuth token at all

        await dbConnect();
        // Find an agent by iterating and comparing the token with the stored hash
        const agents = await Agent.find({}); // Fetch all agents (or a subset if performance is an issue, but for now, assume few agents)
        let foundAgent = null;
        for (const agent of agents) {
          const isMatch = await bcryptjs.compare(token, agent.betterAuthTokenHash);
          if (isMatch) {
            foundAgent = agent;
            break;
          }
        }

        if (foundAgent) {
          (req as any).agent = foundAgent;
          return handler(req, res);
        }
      } catch (agentError) {
        // Suppress agent auth errors and fall through to the final unauthorized error
      }

      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}