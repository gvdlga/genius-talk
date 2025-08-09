# External APIs

The application has one critical external dependency.

## BetterAuth Authentication Service
*   **Purpose:** To provide a centralized and secure way to handle user and agent authentication and authorization. It acts as the authoritative source for user and agent identities and their authentication status.
*   **Documentation:** `https://www.better-auth.com/docs/introduction` (Note: Detailed API and integration documentation is required for full understanding and is currently being researched.)
*   **Integration:** The Genius Talk backend uses the `@better-auth/server-side-library` to validate incoming bearer tokens for both users and agents. The frontend uses the client-side library to manage user login flows and token acquisition. This library is a critical external dependency.

### Usage Instructions

To integrate and use BetterAuth:

1.  **Installation:** Add `better-auth` to your project:
    ```bash
    yarn add better-auth
    ```
    For the UI library (if used):
    ```bash
    yarn add @daveyplate/better-auth-ui@latest
    ```
2.  **Environment Variables:** Create a `.env` file with:
    *   `BETTER_AUTH_SECRET`: A strong, random value for encryption and hashing.
    *   `BETTER_AUTH_URL`: The base URL of your application (e.g., `http://localhost:3000`).
3.  **BetterAuth Instance:** Create an `auth.ts` file (e.g., in `src/lib/`) to initialize BetterAuth:
    ```typescript
    import { betterAuth } from "better-auth";
    import dbConnect from "@/lib/dbConnect"; // Assuming this connects to MongoDB
    import mongoose from "mongoose"; // Assuming Mongoose is used for MongoDB

    // Example with MongoDB (assuming Mongoose connection)
    export const auth = betterAuth({
      database: {
        connect: async () => {
          await dbConnect(); // Connect to MongoDB
          return mongoose.connection.db; // Return the MongoDB database instance
        },
      },
      // ... other configurations like providers for email/password, social sign-on
    });
    ```
4.  **Client Instance (Frontend):** For frontend interaction, create a client instance:
    ```typescript
    import { createAuthClient } from "better-auth/react"; // or other framework-specific import
    export const authClient = createAuthClient();
    ```
5.  **Mount Handler (Backend API Route):** Set up an API route (e.g., `pages/api/auth/[...betterauth].ts`) to handle BetterAuth requests:
    ```typescript
    import { auth } from "@/lib/auth"; // Your initialized BetterAuth instance
    export default auth.handler;
    ```
6.  **Authentication Methods:** Configure desired authentication methods (e.g., email/password, social sign-on providers) within the `betterAuth` instance configuration.
7.  **Database Schema:** Use the BetterAuth CLI tool to manage database schema and migrations:
    ```bash
    npx @better-auth/cli generate
    ```
    or
    ```bash
    npx @better-auth/cli migrate
    ```

