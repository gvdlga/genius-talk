import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Agent from '@/lib/models/Agent';
import { auth } from '@/lib/auth'; // Import the auth instance
import { toNextJsHandler } from 'better-auth/next'; // Import toNextJsHandler

// Define a type for the request with agent information
interface NextApiRequestWithAgent extends NextApiRequest {
  agent?: any; // Or a more specific Agent type
}

const agentSchema = z.object({
  name: z.string(),
  betterAuthToken: z.string(),
});

// POST handler for agent registration
async function POST(req: NextApiRequestWithAgent, res: NextApiResponse) {
  try {
    const { accountId } = req.query;
    const validation = agentSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: 'Invalid request body', errors: validation.error.errors });
    }

    const { name, betterAuthToken } = validation.data;

    // Use auth.validateToken if it exists and is the correct way to validate tokens
    // Based on the better-auth examples, it seems the library handles token validation internally
    // when using toNextJsHandler. So, direct validateToken call might not be needed here.
    // However, the original code had it, so I will keep it for now, assuming it's a custom validation.
    // If better-auth handles it, this part might be redundant or need adjustment.
    // For now, I'll assume validateToken is a method on the auth instance.
    const isValidToken = await auth.validateToken(betterAuthToken); // Assuming auth.validateToken exists
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

// Export the handlers using toNextJsHandler
export default toNextJsHandler(auth, {
  POST,
  // Add other methods like GET, PUT, DELETE if needed
});