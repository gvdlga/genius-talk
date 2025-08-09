import mongoose, { Schema, Document } from 'mongoose';
import { Agent } from 'packages/shared/src';

const AgentSchema: Schema = new Schema({
  agentId: { type: String, unique: true },
  accountId: { type: String, required: true },
  name: { type: String, required: true },
  betterAuthTokenHash: { type: String, required: true },
});

export default mongoose.models.Agent || mongoose.model<Agent & Document>('Agent', AgentSchema);
