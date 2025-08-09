export interface Account {
  accountId: string;
  name: string;
}

export interface AccountMember {
  accountId: string;
  role: 'admin' | 'member';
}

export interface User {
  userId: string;
  email: string;
  name: string;
  accounts: AccountMember[];
}

export interface Agent {
  agentId?: string;
  accountId: string;
  name: string;
  betterAuthTokenHash: string;
}

export interface Channel {
  channelId: string;
  accountId: string;
  name: string;
  isPublic: boolean;
  members: (User['userId'] | Agent['agentId'])[];
}

export type MessageType = 'GENERAL' | 'REQUEST' | 'RESPONSE';

export interface Worker {
  workerId: User['userId'] | Agent['agentId'];
  startedAt: Date;
}

export interface Message {
  messageId: string;
  channelId: Channel['channelId'];
  senderId: User['userId'] | Agent['agentId'];
  content: string;
  type: MessageType;
  parentMessageId?: Message['messageId'];
  workers?: Worker[]; // Only for messages of type 'REQUEST'
  createdAt: Date;
}
