# External APIs

The application has one critical external dependency.

## BetterAuth Authentication Service
*   **Purpose:** To provide a centralized and secure way to handle user and agent authentication via API keys (bearer tokens).
*   **Documentation:** `https://www.better-auth.com/docs/introduction`
*   **Integration:** The Genius Talk backend uses the BetterAuth server-side library to validate the incoming token on every request. The frontend uses the client-side library to handle the login flow and acquire a token for the user.
