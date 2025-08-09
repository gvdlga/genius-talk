# Data Models

## Account Model
*   **Purpose:** Represents a single customer or tenant, acting as the primary container for all their data.
*   **TypeScript Interface:**
    ```typescript
    interface Account {
      accountId: string;
      name: string;
    }
    ```

## User Model
*   **Purpose:** Represents a human participant. A user can belong to multiple accounts.
*   **TypeScript Interface:**
    ```typescript
    interface AccountMember {
      accountId: string;
      role: 'admin' | 'member';
    }

    interface User {
      userId: string;
      email: string;
      name: string;
      accounts: AccountMember[];
    }
    ```

## Agent Model
*   **Purpose:** Represents an AI participant, owned by a single account.
*   **TypeScript Interface:**
    ```typescript
    interface Agent {
      agentId: string;
      accountId: string;
      name: string;
      betterAuthTokenHash: string; // Hashed token provided by BetterAuth for agent authentication
    }
    ```

## User Model
*   **Purpose:** Represents a human participant. A user can belong to multiple accounts. User identities are managed by BetterAuth, and only essential user data is stored locally.

## Channel Model
*   **Purpose:** Represents a conversation space, owned by a single account.
*   **TypeScript Interface:**
    ```typescript
    interface Channel {
      channelId: string;
      accountId: string;
      name: string;
      isPublic: boolean;
      members: (User['userId'] | Agent['agentId'])[];
    }
    ```

## Message Model
*   **Purpose:** Represents a single communication unit, designed to support the collaborative request/response workflow.
*   **TypeScript Interface:**
    ```typescript
    type MessageType = 'GENERAL' | 'REQUEST' | 'RESPONSE';

    interface Worker {
      workerId: User['userId'] | Agent['agentId'];
      startedAt: Date;
    }

    interface Message {
      messageId: string;
      channelId: Channel['channelId'];
      senderId: User['userId'] | Agent['agentId'];
      content: string;
      type: MessageType;
      parentMessageId?: Message['messageId'];
      workers?: Worker[]; // Only for messages of type 'REQUEST'
      createdAt: Date;
    }
    ```
