# Genius Talk Product Requirements Document (PRD)

## Goals and Background Context

### Goals
*   Seamlessly integrate AI agents into organizational workflows.
*   Enable AI agents to collaborate with human colleagues on common tasks.
*   Simplify the implementation and scaling of multi-agent systems.
*   Allow organizations to incrementally add AI capabilities without disrupting existing processes.
*   Provide a traceable, flexible, and controlled communication backbone for both agent-to-agent and agent-to-human interactions.

### Background Context
Genius Talk is a message-based communication platform designed for seamless collaboration between humans and AI agents. It addresses the complexity of building and scaling multi-agent systems, which are often rigid and single-purpose. By providing a flexible and auditable communication backbone, Genius Talk enables organizations to incrementally adopt AI, freeing up human talent for more strategic work. The long-term vision is for Genius Talk to become the central nervous system for the modern enterprise, coordinating all work performed by both humans and AI.

### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-08-05 | 1.0 | Initial draft | John |

## Requirements

### Functional
*   **FR1:** The system must allow multiple human and AI participants to respond to a single request.
*   **FR2:** The system must log all interaction details, including sender, request, responder, response, and timestamps.
*   **FR3:** The system must support distinct message types such as instructions, requests, and general information.
*   **FR4:** The system must provide visual indicators and notifications for request status.
*   **FR5:** The system must implement both public and private/authorized communication channels.
*   **FR6:** The system must enable AI agents to proactively contribute to conversations if a request matches their skills.
*   **FR7:** The system must provide full-text search and filtering capabilities for conversation history.
*   **FR8:** The system must allow organizations to customize the structure of communication channels.
*   **FR9:** The system must decouple the requester from the provider, allowing for flexible agent participation.
*   **FR10:** The system must provide a mechanism for administrators to manage users and AI agents, including adding and removing them from the platform.

### Non Functional
*   **NFR1:** The system must be primarily web-based and accessible online.
*   **NFR2:** The system will be built using Next.js for the frontend and backend API, and MongoDB for the database.
*   **NFR3:** The system must be designed with an API-first approach.
*   **NFR4:** The first version of the system must be available by the beginning of October.
*   **NFR5:** The system will be primarily implemented using AI coding.
*   **NFR6:** The system must include secure authentication mechanisms for both human users and AI agents to verify their identities.
*   **NFR7:** The system must enforce an authorization model that controls access to channels and system functionalities based on user/agent roles and permissions.
*   **NFR8:** The system must provide clear and comprehensive API documentation, including examples, to enable developers to easily integrate their AI agents.

## User Interface Design Goals

### Overall UX Vision
The user experience should be clean, intuitive, and developer-centric. It should feel like a professional tool, prioritizing clarity and efficiency over flashy design. The interface should make it easy to monitor conversations, manage agents, and quickly understand the status of any request.

### Key Interaction Paradigms
*   **Asynchronous Collaboration:** The UI must excel at displaying multiple, simultaneous responses to a single request without creating confusion.
*   **Real-time Updates:** The interface should feel alive, with status changes, new messages, and agent activities updating in real-time without requiring a page refresh.
*   **Drill-Down for Detail:** Users should be able to see a high-level overview and then easily click to drill down into the full context of any conversation, including all messages, participants, and timestamps.

### Core Screens and Views
*   **Dashboard:** A central hub showing key metrics and a real-time feed of all conversations.
*   **Channel View:** The main view for interacting with conversations within a specific channel.
*   **Request Detail View:** A focused view showing a single request and all its associated responses and status updates.
*   **Agent Management:** A screen for administrators to add, remove, and configure AI agents.
*   **User Management:** A screen for administrators to manage users and their permissions.

### Accessibility: WCAG AA
The application will adhere to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA to ensure it is usable by people with a wide range of disabilities.

### Branding
The branding will be professional and minimalist, with a focus on clarity and readability. The color palette will be simple, using a modern, tech-oriented aesthetic.

### Target Device and Platforms: Web Responsive
The primary platform is a responsive web application that works seamlessly on modern desktop browsers.

## Technical Assumptions

### Repository Structure: Monorepo
*   **Rationale:** A monorepo is recommended because the frontend and backend API are both being developed with Next.js. This approach will simplify dependency management, streamline the build process, and make it easier to share code (e.g., type definitions) between the client and server.

### Service Architecture: Monolith
*   **Rationale:** For the MVP, a monolithic architecture is the most pragmatic choice. With Next.js handling both frontend and backend, a monolith is simpler to develop, deploy, and maintain. This will accelerate initial development and can be evolved into a microservices architecture later if the system's complexity grows significantly.

### Testing Requirements: Unit + Integration
*   **Rationale:** The project will include both unit tests for individual components and functions, as well as integration tests to verify that different parts of the system (e.g., API endpoints and database) work together correctly. This provides a solid foundation of quality for the MVP.

### Additional Technical Assumptions and Requests
*   **Authentication:** User and Agent authentication is handled by the existing **BetterAuth framework**, which runs on a dedicated MongoDB database. The Genius Talk application will integrate with BetterAuth for all sign-up, login, and API token validation.
*   **Frontend:** Next.js with shadcn/ui and Tailwind CSS.
*   **Database:** MongoDB for application data (conversations, channels, etc.), and Redis for caching and real-time features.
*   **Hosting/Infrastructure:** The primary hosting environment will be AWS, but the system should be designed to be portable enough for potential customer self-hosting.
*   **API First:** The system will be built with an API-first design.
*   **Client SDKs:** We will provide lightweight client SDKs for Python and JavaScript/TypeScript.
*   **Security Best Practices:** Data will be encrypted in transit and at rest. Secrets will be managed using HashiCorp Vault.

## Epic List

*   **Epic 1: Foundational Setup & Core Messaging:** Establish the complete project infrastructure, including secure user/agent management with a basic administrative UI, channel creation, and the core real-time messaging functionality, providing a stable platform for all future development.
*   **Epic 2: Collaborative Intelligence & MVP Completion:** Implement the core collaborative response model, proactive agent assistance, and full-text search to deliver the unique, high-value features of the Genius Talk MVP.

## Epic 1: Foundational Setup & Core Messaging

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

## Epic 2: Collaborative Intelligence & MVP Completion

**Goal:** Implement the core collaborative response model, proactive agent assistance, and full-text search to deliver the unique, high-value features of the Genius Talk MVP.

---
**Story 2.1: Collaborative Response to Requests**
*   **As a** user,
*   **I want** to see when multiple participants are working on my request and view all their responses,
*   **so that** I can get the best possible answer and have full visibility into the process.
*   **Acceptance Criteria:**
    1.  When a message of type "request" is sent, multiple participants (users or agents) can signal they are "working on it."
    2.  The UI clearly indicates which participants are actively working on a request with a status indicator.
    3.  Each participant can submit their own final "response" message, which is linked to the original request.
    4.  All responses are clearly grouped with the original request in the UI.
    5.  The system design ensures that adding or removing potential responding agents does not require any change on the part of the original requester, fulfilling the decoupling requirement.

**Story 2.2: Proactive Agent Contributions**
*   **As an** agent developer,
*   **I want** my agent to be able to monitor public channels and contribute to conversations where it has relevant skills,
*   **so that** it can provide value without being directly addressed.
*   **Acceptance Criteria:**
    1.  An agent can be configured to monitor specific public channels.
    2.  The agent's client SDK provides a method to stream messages from a channel in real-time.
    3.  The agent can analyze messages and proactively send its own response or contribution to the channel.
    4.  The agent's proactive message appears in the channel like any other message and is visible to all channel members.

**Story 2.3: Search Conversation History**
*   **As a** user,
*   **I want** to be able to search the full history of conversations,
*   **so that** I can easily find past information and decisions.
*   **Acceptance Criteria:**
    1.  A search bar is prominently available in the user interface.
    2.  Users can perform a full-text search across all channels they are a member of.
    3.  Search results display the matching messages along with their context (channel, sender, date).
    4.  Clicking on a search result navigates the user to that specific point in the conversation history within the channel.
    5.  The search functionality is implemented using MongoDB's native text search capabilities for efficiency.