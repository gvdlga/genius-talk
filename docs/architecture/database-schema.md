# Database Schema

The database is designed for multi-tenancy, with all collections indexed by `accountId`.

*   **`accounts`:** Stores tenant information.
*   **`users`:** Stores user profiles, with a list of accounts each user belongs to.
*   **`agents`:** Stores AI agent configurations, scoped to an account.
*   **`channels`:** Stores conversation channels, scoped to an account.
*   **`messages`:** Stores all messages. This is the primary collection, with compound indexes on `(accountId, channelId, createdAt)` for performance and a text index on `content` for search.
