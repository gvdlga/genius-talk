# API Specification

The API is a RESTful service with all endpoints scoped by `accountId` to ensure multi-tenancy. Authentication is handled via a bearer token on every request.

*   **Specification:** `docs/openapi.yaml` (A full OpenAPI 3.0 spec will be maintained here)
*   **Example Endpoints:**
    *   `GET /api/accounts/{accountId}/channels`
    *   `POST /api/accounts/{accountId}/channels/{channelId}/messages`
    *   `POST /api/accounts/{accountId}/agents`
*   **Authentication:** All requests must include an `Authorization: Bearer <token>` header with a valid API key from BetterAuth.
