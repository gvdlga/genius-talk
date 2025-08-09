import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Agent from '@/lib/models/Agent';
import { auth } from '@/lib/auth';
import { validateToken } from '@better-auth/server-side-library';

const agentSchema = z.object({
  name: z.string(),
  betterAuthToken: z.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { accountId } = req.query;
    const validation = agentSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: 'Invalid request body', errors: validation.error.errors });
    }

    const { name, betterAuthToken } = validation.data;

    const isValidToken = await validateToken(betterAuthToken);
    if (!isValidToken) {
      return res.status(401).json({ message: 'Invalid BetterAuth token' });
    }

    await dbConnect();

    const betterAuthTokenHash = await bcryptjs.hash(betterAuthToken, 10);

    const agent = await Agent.create({
      accountId: accountId as string,
      name,
      betterAuthTokenHash,
    });

    res.status(201).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default auth(handler);
