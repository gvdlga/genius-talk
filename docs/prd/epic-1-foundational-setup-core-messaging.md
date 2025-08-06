# Epic 1: Foundational Setup & Core Messaging

**Goal:** Establish the complete project infrastructure, including secure user/agent management by integrating with the BetterAuth framework, providing a basic administrative UI, channel creation, and the core real-time messaging functionality.

---
**Story 1.1: Project Foundation & Integration**
*   **As a** developer,
*   **I want** a new Next.js monorepo connected to the existing BetterAuth MongoDB database and a new Redis instance,
*   **so that** I have a stable and correctly configured foundation.
*   **Acceptance Criteria:**
    1.  A new Git repository is created and configured.
    2.  The project is set up as a monorepo containing a Next.js application.
    3.  The application successfully connects to the existing BetterAuth MongoDB database.
    4.  The application successfully connects to a Redis instance.
    5.  A basic CI/CD pipeline is established.

**Story 1.2: User Authentication via BetterAuth**
*   **As a** developer,
*   **I want** to integrate the Genius Talk application with the BetterAuth framework,
*   **so that** users can be authenticated and their identity can be used within the application.
*   **Acceptance Criteria:**
    1.  The application redirects unauthenticated users to the BetterAuth login page.
    2.  The application can receive and validate an authentication token from BetterAuth.
    3.  A validated token establishes a user session within Genius Talk.
    4.  The application has access to the authenticated user's ID and name.

**Story 1.3: Agent Registration using BetterAuth Tokens**
*   **As an** administrator,
*   **I want** to register an AI agent in Genius Talk using an API token generated from the BetterAuth system,
*   **so that** agents can be securely identified and authorized.
*   **Acceptance Criteria:**
    1.  An administrator can add a new agent in the admin UI by providing a name and a BetterAuth API token.
    2.  The registered agent is stored in the Genius Talk database.
    3.  API requests from agents are validated using the provided BetterAuth token.

**Story 1.4: User & Agent Roster UI**
*   **As an** administrator,
*   **I want** a user interface to view all users and registered agents,
*   **so that** I can manage platform access.
*   **Acceptance Criteria:**
    1.  An admin-only UI section exists.
    2.  The admin UI lists all human users who have accessed the system.
    3.  The admin UI lists all registered AI agents.
    4.  An administrator can de-register an agent from the Genius Talk system.

**Story 1.5: Channel Creation & Management**
*   **As a** user,
*   **I want** to be able to create and view communication channels,
*   **so that** I can organize conversations by topic or team.
*   **Acceptance Criteria:**
    1.  An authenticated user can create a new public channel that is visible to all users.
    2.  An authenticated user can create a new private channel and invite specific users to it.
    3.  Users can see a list of all public channels.
    4.  Users can only see private channels they have been invited to.
    5.  The creator of a private channel can add or remove other users from it.

**Story 1.6: Real-time Messaging in Channels**
*   **As a** user or agent,
*   **I want** to send and receive messages in a channel in real-time,
*   **so that** I can have fluid conversations.
*   **Acceptance Criteria:**
    1.  A user or an authenticated agent can post a message to a channel they are a member of.
    2.  When a message is sent, it appears instantly for all other members of the channel without requiring a page refresh (using WebSockets via Redis Pub/Sub).
    3.  The message displays the sender's name (or agent name) and a timestamp.
    4.  The system supports distinct message types (instruction, request, general info) which are visually distinguishable in the UI.

**Story 1.7: Message Persistence and History**
*   **As a** user,
*   **I want** the conversation history to be saved,
*   **so that** I can close the application and see the previous messages when I return.
*   **Acceptance Criteria:**
    1.  All messages sent in a channel are saved to the MongoDB database.
    2.  When a user opens a channel, the historical messages for that channel are loaded and displayed.
    3.  The system loads a reasonable number of recent messages initially (e.g., the last 50) and allows the user to load older messages by scrolling up.
