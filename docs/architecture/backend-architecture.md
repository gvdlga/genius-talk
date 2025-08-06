# Backend Architecture

*   **Service Architecture:** A serverless approach using **Next.js API Routes**. Each endpoint is a self-contained function.
*   **Database Architecture:** We use **Mongoose** to define schemas and the **Repository Pattern** to abstract all database logic from API handlers.
*   **Authentication:** A middleware guard, `auth()`, is called on every API route to validate the BetterAuth bearer token.
