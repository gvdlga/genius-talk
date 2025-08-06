# Technical Assumptions

## Repository Structure: Monorepo
*   **Rationale:** A monorepo is recommended because the frontend and backend API are both being developed with Next.js. This approach will simplify dependency management, streamline the build process, and make it easier to share code (e.g., type definitions) between the client and server.

## Service Architecture: Monolith
*   **Rationale:** For the MVP, a monolithic architecture is the most pragmatic choice. With Next.js handling both frontend and backend, a monolith is simpler to develop, deploy, and maintain. This will accelerate initial development and can be evolved into a microservices architecture later if the system's complexity grows significantly.

## Testing Requirements: Unit + Integration
*   **Rationale:** The project will include both unit tests for individual components and functions, as well as integration tests to verify that different parts of the system (e.g., API endpoints and database) work together correctly. This provides a solid foundation of quality for the MVP.

## Additional Technical Assumptions and Requests
*   **Authentication:** User and Agent authentication is handled by the existing **BetterAuth framework**, which runs on a dedicated MongoDB database. The Genius Talk application will integrate with BetterAuth for all sign-up, login, and API token validation.
*   **Frontend:** Next.js with shadcn/ui and Tailwind CSS.
*   **Database:** MongoDB for application data (conversations, channels, etc.), and Redis for caching and real-time features.
*   **Hosting/Infrastructure:** The primary hosting environment will be AWS, but the system should be designed to be portable enough for potential customer self-hosting.
*   **API First:** The system will be built with an API-first design.
*   **Client SDKs:** We will provide lightweight client SDKs for Python and JavaScript/TypeScript.
*   **Security Best Practices:** Data will be encrypted in transit and at rest. Secrets will be managed using HashiCorp Vault.
